import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const Post = ({ post }) => {

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical' style={{ color: 'violet' }} />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 8, marginTop: 10 }}>
        <PostFooter post={post} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>

    </View>
  )
}

const PostHeader = ({ post }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: post.profile_picture }} style={styles.story} />
        <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>{post.username}</Text>
      </View>

      <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
    </View>
  )
}

const PostImage = ({ post }) => {
  return (
    <View
      style={{ width: '100%', height: 400 }} >
      <Image
        source={{ uri: post.imageUrl }}
        style={{ height: '100%', resizeMode: 'cover' }} />
    </View>

  )
}

const PostFooter = ({ post }) => {

  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row' }}>

      <View style={styles.leftFooterIconsContainer}>
        <Icon
          imgStyle={styles.footerIcon}
          img={require('../../assets/heart_outline.png')}
          action={() => console.log('Like button pressed')} />
        <Icon
          imgStyle={styles.footerIcon}
          img={require('../../assets/comment.png')}
          action={() => navigation.navigate('Comments', { post })} />
        <Icon
          imgStyle={styles.footerIcon}
          img={require('../../assets/share.png')}
          action={() => console.log('share button pressed')} />
      </View>

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Icon
          imgStyle={{ resizeMode: 'contain', width: 25, height: 33 }}
          img={require('../../assets/save.png')}
          action={() => console.log('save button pressed')} />
      </View>

    </View>
  )
}

const Icon = ({ imgStyle, img, action }) => {
  return (
    <TouchableOpacity onPress={action}>
      <Image style={imgStyle} source={img} />
    </TouchableOpacity>
  )
}

const Likes = ({ post }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
      <Text
        style={{ color: 'white', fontWeight: '600' }}>
        {post.likes ? post.likes.toLocaleString('en') : null} likes
      </Text>
    </View>

  )
}

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      <Text style={{ color: 'white' }}>
        <Text style={{ fontWeight: '600' }}>{post.username}</Text>
        <Text> {post.caption}</Text>
      </Text>
    </View>

  )
}

const CommentsSection = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      {post.comments ? (
        <Text style={{ color: 'gray' }}>
          View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}{' '}
          {post.comments.length > 1 ? 'comments' : 'comment'}
        </Text>
      ) : null}
    </View>
  )
}

const Comments = ({ post }) => {
  return (
    <>
      {post.comments ? post.comments.map((comment, index) => (
        <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={{ color: 'white', flex: 1 }}>
            <Text style={{ fontWeight: '600' }}>{comment.username}</Text>
            {' '}{comment.comment}
          </Text>
        </View>
      )) : null}
    </>

  )
}

export default Post

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 2,
    borderColor: 'violet',
  },
  footerIcon: {
    width: 33,
    height: 33
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  }
})