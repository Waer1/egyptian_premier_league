import { message } from 'antd';

export const success = (content: string) => {
    message.success(content);
};
export const error = (content: string) => {
    message.error(content);
};
