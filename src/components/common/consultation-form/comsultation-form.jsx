import styles from './consultation-form.module.scss'
import Link from 'next/link'

export default function ConsultationForm({consultationTitle, consultationText}) {
    return (
        <section className="section-second">
            <div className={styles.consultation_form_container}>
                <h2 dangerouslySetInnerHTML={{ __html: consultationTitle }}></h2>
                <h4 dangerouslySetInnerHTML={{ __html: consultationText }}></h4>
                <form className={styles.consultation_form}>
                    <div className={styles.consultation_form_top_inputs}>
                        <input type="text" placeholder="Ваше имя *" />
                        <input type="text" placeholder="Ваш телефон *" />
                    </div>
                    <div className={styles.consultation_form_bottom_inputs}>
                        <input type="text" placeholder="Сообщение" />
                    </div>
                    <button><p>Отправить заявку</p></button>
                </form>
                <h5>Нажимая кнопку «Отправить заявку», вы автоматически соглашаетесь на обработку <Link href={""} style={{color: '#A47764'}}>личных данных</Link></h5>
            </div>
        </section>
    )
}