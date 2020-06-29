export async function login({ username, password }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'Umrzoq' && password === '12345') {
                resolve();
            } else {
                reject();
            }
        }, 1000);
    });
}