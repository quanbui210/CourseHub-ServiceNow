export interface Course {
    description: string;
    duration: number;
    title: string;
    type: string;
    number: string;
    sys_id: string
}


export interface Subscription {
    sys_id: string;
    learner: {
        link: string;
        value: string;
    };
    course: {
        link: string;
        value: string
    };
    subscription_date: string
}

export interface Learner {
    sys_id: string;
    admission_date: string;
    user_account: {
        link: string;
        value: string
    }
}
