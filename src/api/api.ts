import axios from 'axios';
import {CreateUserRequest, DeleteUserRequest, User} from '../data/model'

const requestConfig = {
    username: '90316-125',
    password: 'pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3',
    acceptType: 'application/json',
    contentType: 'application/json',
    authorization: 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM='
}

const sandboxUrl = 'https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1'

const endpoints = {
    users: {
        get: `${sandboxUrl}/users.json`,
        post: `${sandboxUrl}/users.json`,
        delete: `${sandboxUrl}/users`,
    },
    products: {
        get: `${sandboxUrl}/productgroups.json`,
        post: `${sandboxUrl}/productgroups.json`,
    }
}

const CORS_PROXY = 'http://localhost:8088'
const LIMIT_RECOURCES = 30

const fetchProducts = async () => {
    try {
        const response = await axios.get(`${CORS_PROXY}/${endpoints.products.get}?num=${LIMIT_RECOURCES}`, {
            auth: {
                username: requestConfig.username,
                password: requestConfig.password
            },
            headers: {
                Accept: requestConfig.acceptType,
                "Content-Type": requestConfig.contentType,
                "Authorization": requestConfig.authorization
            }
        });
        return response?.data.items
    } catch (error: any) {
        console.log('Error: ', error)
    }
}

const fetchUsers = async () => {
    try {
        const response = await axios.get(`${CORS_PROXY}/${endpoints.users.get}?num=${LIMIT_RECOURCES}`, {
            auth: {
                username: requestConfig.username,
                password: requestConfig.password
            },
            headers: {
                Accept: requestConfig.acceptType,
                "Content-Type": requestConfig.contentType,
                "Authorization": requestConfig.authorization
            }
        });
        console.log(response)
        return response?.data.items
    } catch (error: any) {
        console.log('Error: ', error)
    }
}

const createUser = async (user: CreateUserRequest) => {
    try {
        const response = await axios.post(`${CORS_PROXY}/${endpoints.users.post}`, [user], {
            auth: {
                username: requestConfig.username,
                password: requestConfig.password
            },
            headers: {
                Accept: requestConfig.acceptType,
                "Content-Type": requestConfig.contentType,
                "Authorization": requestConfig.authorization
            }
        });
        console.log(response)
        return response?.data
    } catch (error: any) {
        console.log('Error: ', error)
    }
}

const deleteUser = async (users: DeleteUserRequest[]) => {
    let deletedUsers: DeleteUserRequest[] = []
    try {
        for(let user of users) {
            debugger;
            const response = await axios.delete(`${CORS_PROXY}/${endpoints.users.delete}/${user.userid}.json`, {
                auth: {
                    username: requestConfig.username,
                    password: requestConfig.password
                },
                headers: {
                    Accept: requestConfig.acceptType,
                    "Content-Type": requestConfig.contentType,
                    "Authorization": requestConfig.authorization
                }
            });
            console.log(response)
            if (response?.data) {
                deletedUsers.push(user)
            } else {
                console.log(`Cannot delete user with id ${user.userid}`)
            }
        }
        return deletedUsers
        
    } catch (error: any) {
        console.log('Error: ', error)
        return []
    }
}

const api = {fetchProducts, createUser, fetchUsers, deleteUser}

export default api