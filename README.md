## IL Trond sin hjemmeside

# What has been done
1. Frontend Development
    a. Installations
        I. yarn
        II. yarn add react-router-dom localforage match-sorter sort-by
        III. Flowbite and TailwindCSS installed
        IV. react-quill (Text Editor) installed

2. Database
    a. Tables
        I. Users (id, name, email, password)
        II. Posts (id, title, desc, img, date, fk_uid)
        III. Pages (id, title, desc, img, date, fk_uid)

3. Backend Development
    a. Installations
        I. npm init -y
        II. yarn add express mysql nodemon
        III. yarn add bcryptjs
        IV. yarn add jsonwebtoken
        V. yarn add axios (IN CLIENT)
        VI. yarn add cors
        VII. yarn add cookie-parser
        VIII. yarn add moment (IN CLIENT)
        IX. yarn add dompurify (IN CLIENT)
        X. yarn add multer
        XI. yarn add js-cookie (IN CLIENT)
        XII. yarn add react-dropzone (IN CLIENT)
        XIII. yarn add fs

# Things to fix before publishing
<!-- - Reverse back to old commit, one before files -->
<!-- - Contact Page -->
<!-- - Upload several files at once -->
<!-- - Pages without menuid show as main -->
<!-- - .map functions must be fixed -->
- Show page with contact info and baneplan under respected menu
- Page with contact info
- .env file
- Fix proxy


## How to use VPS
1. Update website
- Commit changes to main on GIT. Go onto VPS and "git pull origin main"
- npx yarn build in client
- rm -rf /var/www/iltrond/client/index.html
- rm -rf /var/www/iltrond/client/assets
- cp -r dist/* /var/www/iltrond/client
- systemctl reload nginx