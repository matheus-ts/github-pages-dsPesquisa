import moment from 'moment';

export const formatDate = (data: string) => {
    return moment(data).format('DD/MM/YYYY HH:mm')
}