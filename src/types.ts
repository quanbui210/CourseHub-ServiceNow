export interface Response {
    sys_mod_count: string
    sys_updated_on: string
    sys_id: string
    number: string
    sys_created_on: string
    sys_created_by: string
    sys_tag: string
}



export interface Course extends Response {
    description: string;
    duration: number;
    title: string;
    type: string;
    number: string;
    course_image: string
}


export interface Subscription extends Response {
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

export interface Learner extends Response {
    admission_date: string;
    user_account: {
        link: string;
        value: string
    }
}


export interface Attachment {
    size_bytes: string
    image_height: string
    download_link: string
    image_width: string
    content_type: string
    compress: string
    table_sys_id: string
    hash: string
    chunk_size_bytes: string
    size_compressed: string
    state: string
}
