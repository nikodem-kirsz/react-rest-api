export interface User {
    userid: string;
    email?: string;
    namefirst: string;
    datecreated?: string;
    datemodified?: string;
    namelast?: string;
    company?: string;
}

export interface CreateUserRequest {
    email: string;
    namefirst: string;
    namelast: string;
}

export interface UpdateUserRequest {
    userid: string;
    email?: string;
    namefirst: string;
    datecreated?: string;
    datemodified?: string;
    namelast?: string;
    company?: string;
}

export interface DeleteUserRequest {
    userid: string;
}