from http.server import HTTPServer, SimpleHTTPRequestHandler
import cgi
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        # We handle POST specifically for our simple upload form
        if self.path == '/upload_logo':
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={'REQUEST_METHOD': 'POST',
                         'CONTENT_TYPE': self.headers['Content-Type'],
                         }
            )
            
            if 'logo' not in form:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"No file uploaded")
                return
                
            fileitem = form['logo']
            if fileitem.filename:
                # Save as logo.jpg
                filepath = os.path.join(os.getcwd(), 'assets', 'images', 'logo.jpg')
                os.makedirs(os.path.dirname(filepath), exist_ok=True)
                
                with open(filepath, 'wb') as f:
                    f.write(fileitem.file.read())
                
                self.send_response(200)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                self.end_headers()
                
                # HTML response telling them it's done
                html = """
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <title>تم الرفع بنجاح</title>
                    <style>
                        body { font-family: Tahoma, sans-serif; text-align: center; margin-top: 100px; background: #0f1c2e; color: #fff; }
                        a { color: #d4af37; font-size: 20px; font-weight: bold; text-decoration: none; padding: 10px 20px; border: 2px solid #d4af37; border-radius: 5px;}
                        a:hover { background: #d4af37; color: #0f1c2e; }
                    </style>
                </head>
                <body>
                    <h2>تم رفع الشعار وتحديثه بنجاح! 🎉</h2>
                    <p>عد إلى الموقع الآن لترى النتيجة.</p>
                    <br><br>
                    <a href="/">العودة إلى الموقع</a>
                </body>
                </html>
                """
                self.wfile.write(html.encode('utf-8'))
            else:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"No file uploaded")
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server_address = ('', 8080)
    httpd = HTTPServer(server_address, CustomHandler)
    print("Serving on port 8080...")
    httpd.serve_forever()
