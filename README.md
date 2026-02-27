<div dir="rtl">


# 🛡️ پناه — راهنمای اضطراری

یک وب‌اپلیکیشن اضطراری برای شرایط بحرانی و جنگی.  
بدون ردیابی. بدون ثبت‌نام. قابل استفاده آفلاین.

[![PWA](https://img.shields.io/badge/PWA-ready-blueviolet)](#)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Telegram](https://img.shields.io/badge/telegram-@panah__net-blue)](https://t.me/panah_net)

<br clear="left">

---

## 📱 بخش‌های اپلیکیشن

| بخش | توضیح |
|-----|-------|
| 🏠 خانه | دسترسی سریع اضطراری و راهنمای فوری |
| 🏚️ پناه | راهنمای گام‌به‌گام پناه‌گیری در خطر |
| 🩺 کمک اولیه | خونریزی، CPR، شوک، سوختگی |
| 🏥 بیمارستان‌ها | جستجو و تماس مستقیم با بیمارستان‌های استان‌ها |
| 🎒 کیف اضطراری | چک‌لیست ۲۴ آیتمی |
| 📡 ارتباطات | فرکانس‌های رادیو، SOS، مدیریت باتری |
| 📞 اورژانس | شماره‌های اضطراری برای تماس مستقیم |
| 🖼️ چیت‌شیت | تصاویر راهنما قابل دانلود |
| 📝 یادداشت | ذخیره محلی مخاطبین، آدرس‌ها و اطلاعات پزشکی |

---

## 🏗️ معماری

```
PWA (Static Hosting)  ←→  FastAPI (Python)  ←→  MySQL
```

داده‌های استان‌ها، پناهگاه‌ها و شماره‌های اضطراری به‌صورت JSON محلی در پروژه نگه‌داری می‌شن.  
داده‌های بیمارستان‌ها از API خوانده می‌شن تا قابل به‌روزرسانی باشن.

---

## 📂 ساختار پروژه


<div dir="ltr">

```
Panah/
├── index.html
├── manifest.json
├── sw.js
├── assets/
│   ├── panah-logo.png
│   ├── cheatsheet-ajir.png
│   ├── cheatsheet-communication.png
│   └── cheatsheet-firstaid.png
└── data/
    ├── provinces.json          # اطلاعات ۳۱ استان + هلال احمر
    ├── shelters.json           # پناهگاه‌های موقت
    └── emergency_numbers.json  # شماره‌های اضطراری
```

</div>

---

## 🗂️ ساختار فایل‌های JSON

**provinces.json**
```json
{
  "data": [
    {
      "id": 1,
      "name": "تهران",
      "capital": "تهران",
      "warning": "",
      "rc": "هلال احمر تهران — 021-87712323",
      "rc_contact": "آقای منصوری",
      "rc_mobile": "09122110084"
    }
  ]
}
```

**shelters.json**
```json
{
  "data": [
    {
      "id": 1,
      "status": "published",
      "description": "۱۱۴ ایستگاه مترو تهران",
      "province": 1
    }
  ]
}
```

**emergency_numbers.json**
```json
{
  "data": [
    {
      "id": 1,
      "name": "اورژانس",
      "number": "115",
      "icon": "🚑"
    }
  ]
}
```

---

## ➕ افزودن داده جدید

- **استان جدید** ← `provinces.json` را ویرایش کنید و id منحصربه‌فرد بدهید
- **پناهگاه جدید** ← `shelters.json` را ویرایش کنید و `province` را مشخص کنید
- **شماره اضطراری جدید** ← `emergency_numbers.json` را ویرایش کنید
- **بیمارستان جدید** ← از طریق Issues گزارش دهید تا در API اضافه شود

---

## 🤝 مشارکت

اطلاعات اشتباه دیدید یا بیمارستان/پناهگاه جدیدی می‌شناسید؟

۱. یک [Issue جدید](https://github.com/MR-Amouei/Panah/issues/new) باز کنید  
۲. یا مستقیماً فایل JSON مربوطه را ویرایش کنید و Pull Request بفرستید

بیمارستان‌هایی که شخصاً تأیید شده‌اند با نشان **✓ تأیید شده** مشخص می‌شوند.

---


<div align="center">
  
ساخته شده برای مردم ایران ❤️
</div>
</div>