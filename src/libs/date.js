import format from 'date-fns/format';

export const formatDate = () => format(new Date(), 'MMMM do yyyy, h:mm:ss a')