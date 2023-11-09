import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                secure: false,
                auth: {
                    user: 'ata954622@gmail.com',
                    pass: 'nitoxzrabhuyatgk'
                }
            },
            defaults:{
                from: '"No Reply" <ata954622@gmail.com>',
            }
        })
    ]
})
export class MailModule {}