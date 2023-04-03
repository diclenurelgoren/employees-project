export class Request {

    constructor(url) {
        this.url = url;
    }

    async get() {
        const response = await fetch(this.url);
        const responsedata = await response.json();

        return responsedata;
    }

    async post(data) {
        const response = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const responsedata = await response.json();

        return responsedata;
    }


    async put(id, data) {
        const response = await fetch(this.url + "/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const responsedata = await response.json();

        return responsedata;
    }

    async delete(id) {
        const response = await fetch(this.url + "/" + id, {
            method: "DELETE"
        });

        return "Veri silindi";
    }

}