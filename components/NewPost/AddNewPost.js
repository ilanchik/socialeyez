import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import FormikPostUploader from './FormikPostUploader'
import * as ImagePicker from 'expo-image-picker'
import { Divider } from 'react-native-elements'
import { ref, put, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage, auth } from '../../firebase'


const AddNewPost = () => {

    // Use states
    const [hasGalleryPermission, sethasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    // Use effect (permissions)
    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

            sethasGalleryPermission(galleryStatus.status === 'granted');
            setHasCameraPermission(cameraStatus.status === 'granted');

        })();
    }, []);

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync()
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const uploadImage = async () => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const imageRef = ref(storage, filename);
        console.log(uploadUri);

        setUploading(true);

        // Create blob using XMLHttpRequest
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uploadUri, true);
            xhr.send(null);
        });


        const uploadTask = uploadBytesResumable(imageRef, blob);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
            (error) => {
                console.log(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    console.log('File available at', downloadUrl);
                });
            }
        );
    }

    if (hasGalleryPermission === false || hasCameraPermission === false) {
        return <Text>No access to Internal Storage</Text>
    }

    return (
        <View style={{ flex: 1 }}>
            <FormikPostUploader />
            {/*}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={pickImage} >
                    <Text style={styles.buttonText}>Photo Library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={takePhoto} >
                    <Text style={styles.buttonText}>Camera</Text>
                </TouchableOpacity>
            </View>
            <Divider />
            {image && <Image source={{ uri: image }} style={{ flex: 1 / 2, padding: 50 }} />}
            <Divider />
            <View>
                <TextInput style={{ color: 'white' }} multiline={true} numberOfLines={2} onPress={(uploadImage)} ></TextInput>
    </View> */}
        </View >
    )
}

export default AddNewPost

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    button: {
        backgroundColor: 'pink',
        padding: 5,
        borderRadius: 5
    },
    buttonText: {
        color: 'magenta',
        fontSize: 24
    }
})