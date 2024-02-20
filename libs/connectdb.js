import { google } from 'google-auth-library';
import dotenv from 'dotenv';
import NextResponse from 'next/server';

dotenv.config({
    path: '../.env',
});

const connectSheet = async () => {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        // Dapatkan objek client OAuth2 yang sebenarnya
        const authClient = await auth.getClient();

        return NextResponse.json({ message: 'koneksi berhasil' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'koneksi db gagal' }, { status: 500 });
    }
};

module.exports = connectSheet;
