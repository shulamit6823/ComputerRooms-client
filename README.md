# ComputerRooms – מערכת פניות לתמיכה בחדרי מחשבים

מערכת לניהול פניות תמיכה: מורה פותחת פנייה על תקלה בחדר מחשבים, ואחראית מטפלת בה עד לסיום.

## קישורים

- **האתר:** https://computerrooms-client.onrender.com
- **קוד הצד־לקוח (React):** https://github.com/shulamit6823/ComputerRooms-client
- **קוד השרת (ASP.NET Core):** https://github.com/shulamit6823/ComputerRooms-server

> השרת רץ בתוכנית החינמית של Render ו"נרדם" כשאין בו שימוש – הכניסה הראשונה עשויה להימשך עד דקה.

## פרטי התחברות למנהל

| | |
|---|---|
| **מייל** | `admin@computerrooms.local` |
| **סיסמה** | `87654321` |

המנהל יכול להוסיף אחראיות. מורה נרשמת בעצמה דרך דף ההרשמה.

## תפקידים

- **מורה** – נרשמת למערכת, פותחת פניות, עוקבת אחריהן ומוסיפה הודעות.
- **אחראית** – נוצרת על ידי המנהל, לוקחת פניות לטיפול, משנה סוג וסטטוס, כותבת הודעות למורה והערות פנימיות.
- **מנהל** – מוסיף ומסיר אחראיות.

## טכנולוגיות

React 19, TypeScript, Vite, MUI, React Router, TanStack Query, React Hook Form.
השרת: ASP.NET Core 6, Entity Framework Core, PostgreSQL, JWT.

## הרצה מקומית

```
npm install
npm run dev
```

בזמן פיתוח הבקשות ל־`/api` מועברות לשרת המקומי `https://localhost:7122` (מוגדר ב־`vite.config.ts`).
