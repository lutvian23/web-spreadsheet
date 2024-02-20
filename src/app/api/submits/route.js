import {NextResponse} from 'next/server'
import dotenv from 'dotenv'
import {google} from 'googleapis'


dotenv.config({
    path: '../../../../.env'
})

export async function POST(request) {
    try {
        console.log('start connect')

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets'
            ],
        });
        console.log('connected')
        
        const sheets = google.sheets({
            auth,
            version: 'v4'
        })
        const {name,message} = await request.json()

        console.log(`configuration sheet`)
        
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'record!A1:B1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [name,message]
                ]
            }
        })

        console.log(`finish`)
        return NextResponse.json({message: 'success'},{status: 200})
    } catch (error) {
        console.log(`handling error: ${error.message}`)
        return NextResponse.json({message: 'failed'},{status:500})
    }
}