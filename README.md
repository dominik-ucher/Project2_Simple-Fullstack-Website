## IL Trond sin hjemmeside

# What has been done
1. Frontend Development
    a. Installations
        I. yarn
        II. yarn add react-router-dom localforage match-sorter sort-by
        III. Flowbite and TailwindCSS installed
        IV. react-quill (Text Editor) installed

2. Backend Development
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
- Lazy Load img
- Fix side menu closing
<!-- - Upload files in Nyheter -->
<!-- - "Are you sure you want to delete" modula -->
<!-- - Fix auto logout -->
<!-- - File upload before published pages -->
<!-- - Admin page "Drag and Drop" shown when clicked edit -->
- Search function in Admin Personer
- Add payment gateway
- Implement email on VPS
- Add meta tags


## How to use VPS
1. Update website
- Commit changes to main on GIT. Go onto VPS and "git pull origin main"
- npx yarn build in client
- rm -rf /var/www/iltrond/client/index.html && rm -rf /var/www/iltrond/client/assets
- cp -r dist/* /var/www/iltrond/client
- systemctl reload nginx