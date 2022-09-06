import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const placeHolderImage = require('../../assets/back1.png');

// Schema for what is allowed and not allowed
const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL IS REQUIRED"),
    caption: Yup.string().max(2200, "Caption has reached the character limit")
})

const FormikPostUploader = () => {

    const [thumbnailUrl, setThumbnailUrl] = useState(placeHolderImage);

    const navigation = useNavigation();

    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => {
                console.log(values);
                console.log("Successful upload");
                navigation.goBack();
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