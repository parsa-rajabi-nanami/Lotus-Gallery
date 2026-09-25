import lotusLogo from '../assets/branding/lotus-logo-gold.svg'

export default function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top" data-reveal="item"><a href="#top" className="brand"><img src={lotusLogo} alt="لوتوس" /><span>LOTUS<small>JEWELRY GALLERY</small></span></a><p>سرمایه‌گذاری ماندگار، با انتخابی که از زمان عبور می‌کند.</p><a href="#top" className="back-top">بازگشت به بالا ↑</a></div><div className="footer-bottom" data-reveal="item"><div><small>تماس با ما</small><a href="tel:+982133941295">۰۲۱-۳۳۹۴۱۲۹۵</a><a href="tel:+989363793110">۰۹۳۶۳۷۹۳۱۱۰</a></div><div><small>ساعات فعالیت</small><span>هر روز، ۸ تا ۲۱</span></div><div><small>آدرس</small><span>پاساژ چیت‌ساز، طبقه ۴</span></div><span className="copyright en-text">© 2026 LOTUS GALLERY</span></div></div></footer>
}
