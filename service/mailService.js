const nodemailer = require('nodemailer')

class MailService {

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        try{
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Активация аккаунта на' + ' ' + 'Arento.ru',
                text:'',
                html:
                    `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            })
        } catch (e) {
            return null
        }
    }

    async  sendSelectionApplicationAnimal(name, area, firstDate, lastDate, peopleCount, roomCount, budget, animal, animalDesc, wishes, phone){
        try{
            if(animal === 'Да' && animalDesc){
                await this.transporter.sendMail({
                    from: process.env.SMTP_USER,
                    to: process.env.SMTP_SELECTION,
                    subject: 'Заявка на подбор!',
                    text:'',
                    html:
                        `
                        <div>
                            <h1>!!! Заявка на подбор !!!</h1>
                            <h3>От ${name}</h3>
                            <h3>С ${firstDate} по ${lastDate}</h3>
                            <h3>Количество проживающих человек: ${peopleCount}</h3>
                            <h3>Район города: ${area}</h3>
                            <h3>Необходимо комнат: ${roomCount}</h3>
                            <h3>С животными: ${animal}</h3>
                            <h3>Описание животного: ${animalDesc}</h3>
                            <h3>Пожелания: ${wishes}</h3>
                            <h3>Бюджет (за сутки): ${budget}</h3>
                            <h3>Телефон: ${phone}</h3>
                        </div>
                    `
                })
            }
        } catch (e) {
            return null
        }
    }

    async sendSelectionApplication(name, area, firstDate, lastDate, peopleCount, roomCount, budget, wishes, phone){
        try{
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: process.env.SMTP_SELECTION,
                subject: 'Заявка на подбор!',
                text:'',
                html:
                    `
                        <div>
                            <h1>!!! Заявка на подбор !!!</h1>
                            <h3>От ${name}</h3>
                            <h3>С ${firstDate} по ${lastDate}</h3>
                            <h3>Количество проживающих человек: ${peopleCount}</h3>
                            <h3>Район города: ${area}</h3>
                            <h3>Необходимо комнат: ${roomCount}</h3>
                            <h3>С животными: Нет</h3>
                            <h3>Пожелания: ${wishes}</h3>
                            <h3>Бюджет (за сутки): ${budget}</h3>
                            <h3>Телефон: ${phone}</h3>
                        </div>
                    `
            })
        } catch (e) {
            return null
        }
    }
}

module.exports = new MailService()