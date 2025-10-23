import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='.', **kwargs)

def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("serving at port", PORT)
        httpd.serve_forever()

async def main():
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(f"http://localhost:{PORT}/index.html")
        await page.screenshot(path="jules-scratch/verification/verification.png")
        await browser.close()

    # The server is a daemon thread, so it will exit when the main thread exits.
    # We'll give it a moment to shut down gracefully.
    await asyncio.sleep(1)


if __name__ == "__main__":
    asyncio.run(main())
