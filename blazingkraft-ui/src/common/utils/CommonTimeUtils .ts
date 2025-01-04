import moment from 'moment-timezone';

const COMMON_TIME_FORMAT = 'HH:mm:ss.SSS';

const COMMON_DATE_FORMAT = 'DD MMM YYYY hh:mm:ss.SSSZ A';

const COMMON_DATE_FORMAT_OPTIONS = [
    {
        label: 'DD MMM YYYY hh:mm:ss.SSSZ A',
        value: 'DD MMM YYYY hh:mm:ss.SSSZ A',
    },
    {
        label: 'DD/MM/YYYYTHH:mm:ss.SSSZ',
        value: 'DD/MM/YYYYTHH:mm:ss.SSSZ',
    },
    {
        label: 'MM/DD/YYYY hh:mm:ss.SSSZ A',
        value: 'MM/DD/YYYY hh:mm:ss.SSSZ A',
    },
];

const TIMEZONES = moment.tz.names();

const TIMEZONES_OPTIONS = TIMEZONES.map(tz => ({
    label: tz,
    value: tz,
}));

const CURRENT_TIMEZONE = moment.tz.guess();

function timestampToFormattedDate(
    timestamp: number,
    timezone: string | undefined,
    format: string | undefined,
) {
    const tz = timezone || CURRENT_TIMEZONE;
    const timeFormat = format || COMMON_DATE_FORMAT;
    if (tz) {
        return moment(timestamp).tz(tz).format(timeFormat);
    }
    return moment(timestamp).format(timeFormat);
}

function datesToTimestamp(
    date: Date,
    time: string,
    timezone: string | undefined,
) {
    const tz = timezone || CURRENT_TIMEZONE;

    const timeMoment = moment(time, 'HH:mm:ss.SSS');

    const momento = moment(date).set({
        hours: timeMoment.hours(),
        minutes: timeMoment.minutes(),
        seconds: timeMoment.seconds(),
        milliseconds: timeMoment.milliseconds(),
    });

    if (tz) {
        return dateToTimestamp(momento.toDate(), tz);
    }
    return moment(momento).valueOf();
}

function dateToTimestamp(date: Date, timezone: string | undefined) {
    const tz = timezone || CURRENT_TIMEZONE;

    if (tz) {
        const momento = moment(date);

        const year = momento.year();
        const month = momento.month();
        const day = momento.day();
        const hours = momento.hours();
        const minutes = momento.minutes();
        const seconds = momento.seconds();
        const milliseconds = momento.milliseconds();

        const mom = moment(momento).tz(tz).set({
            year,
            month,
            day,
            hours,
            minutes,
            seconds,
            milliseconds,
        });

        return mom.valueOf();
    }
    return moment(date).valueOf();
}

function nowAsDate(timezone): Date {
    const tz = timezone || CURRENT_TIMEZONE;
    if (tz) {
        return moment().tz(tz).toDate();
    }
    return moment().toDate();
}

function nowAsTimeString(timezone): string {
    const tz = timezone || CURRENT_TIMEZONE;
    if (tz) {
        return moment().tz(tz).format(COMMON_TIME_FORMAT);
    }
    return moment().format(COMMON_TIME_FORMAT);
}

const CommonTimeUtils = {
    timestampToFormattedDate,
    datesToTimestamp,
    dateToTimestamp,
    TIMEZONES,
    TIMEZONES_OPTIONS,
    CURRENT_TIMEZONE,
    COMMON_DATE_FORMAT,
    COMMON_DATE_FORMAT_OPTIONS,
    nowAsDate,
    nowAsTimeString,
};

export { CommonTimeUtils };
