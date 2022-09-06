import { USERS } from "./users";

export const POSTS = [
    {
        imageUrl: require('../assets/me2.jpg'),
        user: USERS[0].user,
        likes: 7870,
        caption: 'This is a test',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'danielM',
                comment: 'Wow! This is amazing!'
            },
            {
                user: 'danielM',
                comment: 'Wow! This is amazing!'
            },
        ],
    },
    {
        imageUrl: require('../assets/crystal_ball.png'),
        user: USERS[0].user,
        likes: 7870,
        caption: 'This is a test',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'danielM',
                comment: 'Wow! This is amazing!'
            },
            {
                user: 'danielM',
                comment: 'Wow! This is amazing!'
            },
        ],
    },
    {
        imageUrl: require('../assets/crystal_ball.png'),
        user: USERS[2].user,
        likes: 7870,
        caption: 'This is a test',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'danielM',
                comment: 'Wow! This is amazing!'
            },
            {
                user: 'danielM',
                comment: 'Wow! This is amazing!'
            },
        ],
    },
    {
        imageUrl: require('../assets/crystal_ball.png'),
        user: USERS[3].user,
        likes: 7870,
        caption: 'This is a test',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'danielM',
                comment: 'Wow! This is amazing!'
            }
        ],
    },
    {
        imageUrl: require('../assets/crystal_ball.png'),
        user: USERS[0].user,
        likes: 7870,
        caption: 'This is a test',
        profile_picture: USERS[0].image,
        comments: [

        ],
    }
]