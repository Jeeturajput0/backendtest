# ShopEase project structure

This workspace contains two applications:

```text
backendtest/
├── src/                         # React frontend
│   ├── auth/                     # login, signup, route guard
│   ├── components/layout/        # customer layout, header and footer
│   ├── pages/                    # customer-facing pages
│   ├── dashboard/admin/          # admin UI
│   ├── dashboard/vendor/         # vendor UI and navigation
│   └── config/                   # API configuration
├── backend/                      # Express + MongoDB API
│   ├── config/                   # database connection
│   ├── controller/               # business logic
│   ├── middleware/               # authentication and role checks
│   ├── model/                    # MongoDB schemas
│   ├── routes/                   # endpoint groups
│   ├── uploads/products/         # product images
│   └── serves.js                 # server entry point
└── PROJECT_STRUCTURE.md
```

## Roles and ownership

| Role | Frontend | API | Access |
| --- | --- | --- | --- |
| Customer | `/` | `/api` | Store, cart and orders |
| Admin | `/admin` | `/api/admin` | Full administration |
| Vendor | `/vendor` | `/api/vendor` | Their own products only |

Vendor product ownership is verified on the server using the authenticated user ID. Changing a browser URL cannot expose, update, or delete another vendor's product.

## Adding a new feature

Keep a feature in the same layer: React screen in `src`, API endpoint in `backend/routes`, logic in `backend/controller`, and its MongoDB schema in `backend/model`. Do not put database logic inside React components or Express route files.
