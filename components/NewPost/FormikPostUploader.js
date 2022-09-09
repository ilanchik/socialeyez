import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../../firebase';
import { child, onValue, push, ref, update } from 'firebase/database';

// Use image for testing purposes
const placeHolderImage = require('../../assets/back1.png');

// Schema for what is allowed and not allowed
const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL IS REQUIRED"),
    caption: Yup.string().max(2200, "Caption has reached the character limit")
})

const FormikPostUploader = () => {

    const [thumbnailUrl, setThumbnailUrl] = useState(placeHolderImage);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    // Navigation
    const navigation = useNavigation();

    // Get current user's username and profile picture
    const getUser = () => {
        const user = auth.currentUser.uid;
        return onValue(ref(database, 'users/' + user), (snapshot) => {
            setCurrentLoggedInUser({
                username: snapshot.val().username,
                profile_picture: snapshot.val().profile_picture,
            })
        })
    }

    useEffect(() => {
        getUser();
    }, [])

    // Upload post to database
    const uploadPost = async (imageUrl, caption) => {
        const postData = {
            imageUrl: imageUrl,
            username: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profile_picture,
            publisher_uid: auth.currentUser.uid,
            caption: caption,
            date_created: new Date().toLocaleString(),
            date_updated: new Date().toLocaleString(),
            likes: 0,
            likes_by_users: [],
            comments: [
                { username: 'ilanchik', comment: 'wow' },
                { username: 'ilanchik', comment: 'wow' },
                { username: 'ilanchik', comment: 'wow' },
            ],
        }

        const newPostKey = push(child(ref(database), 'posts')).key;
        const updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['users/' + auth.currentUser.uid + '/posts/' + newPostKey] = { postId: newPostKey };

        return update(ref(database), updates).then(() => navigation.goBack());
    }

    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => {
                uploadPost('https://randomuser.me/api/portraits/men/32.jpg', values.caption);
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true} >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                <>
                    <View style={{ margin: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={placeHolderImage} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <TextInput
                                style={{ color: 'white', fontSize: 20 }}
                                placeholder='Write caption...'
                                placeholderTextColor='gray'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption} >
                            </TextInput>
                        </View>
                    </View>
                    <Divider width={0.2} orientation='vertical' />
                    <TextInput
                        style={{ color: 'white', fontSize: 18 }}
                        placeholder='Enter image url...'
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl} >
                    </TextInput>
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 12, color: 'red' }}>{errors.imageUrl}</Text>
                    )}

                    <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
                </>
            )}

        </Formik>
    )
}

export default FormikPostUploader

const styles = StyleSheet.create({})