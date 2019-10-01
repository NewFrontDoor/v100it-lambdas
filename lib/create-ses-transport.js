import SES from 'aws-sdk/clients/ses';
import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';

const transport = sesTransport({
	ses: new SES()
});

export default function createTransport(defaults) {
	return nodemailer.createTransport(transport, defaults);
}
