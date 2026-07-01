from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, template_folder="templates", static_folder="statics")

CV_FILENAME = "CV.pdf"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/download/cv")
def download_cv():
    return send_from_directory(
        os.path.join(app.static_folder, "Tailieu"),
        CV_FILENAME,
        as_attachment=True,
        download_name="PHAM_GIA_BAO_CV.pdf",
    )


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
