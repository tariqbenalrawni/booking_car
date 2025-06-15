# تطبيق تأجير السيارات

تطبيق ويب لتأجير السيارات مبني باستخدام Next.js و Tailwind CSS.

## المميزات

- عرض قائمة السيارات المتاحة
- تفاصيل كاملة لكل سيارة
- نظام حجز متكامل
- حساب السعر تلقائياً
- تخزين الحجوزات محلياً
- واجهة مستخدم عربية سهلة الاستخدام

## المتطلبات

- Node.js 18.0.0 أو أحدث
- npm 9.0.0 أو أحدث

## التثبيت

1. قم بنسخ المشروع:
```bash
git clone [رابط المشروع]
```

2. انتقل إلى مجلد المشروع:
```bash
cd car-rental-app
```

3. قم بتثبيت الاعتمادات:
```bash
npm install
```

4. قم بتشغيل المشروع في بيئة التطوير:
```bash
npm run dev
```

5. افتح المتصفح على العنوان:
```
http://localhost:3000
```

## التقنيات المستخدمة

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- LocalStorage للبيانات

## هيكل المشروع

```
car-rental-app/
├── app/                    # صفحات التطبيق
├── components/            # المكونات المشتركة
├── data/                 # بيانات السيارات
├── public/              # الملفات الثابتة
└── styles/             # ملفات التنسيق
```

## المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:
1. Fork المشروع
2. إنشاء فرع جديد
3. إرسال Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
