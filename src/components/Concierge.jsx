import { useState } from 'react'
import Icon from './Icon'

export default function Concierge() {
  const [sent, setSent] = useState(false)
  const submit = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const message = `سلام، برای رزرو بازدید خصوصی لوتوس درخواست دارم. نام: ${data.get('name')}، زمان: ${data.get('time')}`; window.open(`https://wa.me/989363793110?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); setSent(true) }
  return <section className="section-pad concierge" id="concierge"><div className="container concierge-grid"><div><p className="eyebrow">PRIVATE APPOINTMENT</p><h2>انتخاب شما،<br /><em>تشریفات خودش را دارد.</em></h2><p className="concierge-copy">برای تجربه‌ای خصوصی و متناسب با سلیقه شما، زمان بازدید خود را در آتلیه لوتوس رزرو کنید.</p><div className="address"><span>تهران، بازار بزرگ</span><small>خیابان ۱۵ خرداد، پاساژ چیت‌ساز، طبقه ۴</small></div></div><form className="concierge-form" onSubmit={submit}><label>نام و نام خانوادگی<input name="name" required placeholder="نام شما" /></label><label>زمان پیشنهادی<select name="time" defaultValue="" required><option value="" disabled>انتخاب زمان</option><option>صبح، ۸ تا ۱۲</option><option>ظهر، ۱۲ تا ۱۶</option><option>عصر، ۱۶ تا ۲۱</option></select></label><button className="gold-button" type="submit">{sent ? 'درخواست آماده شد' : 'ادامه در واتساپ'} <Icon name="whatsapp" size={18} /></button><p className="form-note">با انتخاب ادامه، وارد گفت‌وگوی واتساپ مدیریت می‌شوید.</p></form></div></section>
}
