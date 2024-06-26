export function addQuery(url: string, query: any): string {
    let u = new URL(url, url.indexOf('://') === -1 ? location.origin : undefined)
    for (let q in query) {
        if ([undefined, null, ''].indexOf(query[q]) === -1) {
            u.searchParams.set(q, query[q])
        }
    }
    return u.toString()
}

export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export async function externalComponent(url:any) {
    const name = url.split('/').reverse()[0].match(/^(.*?)\.umd/)[1];

    if (window[name]) return window[name];

    // @ts-ignore
    window[name] = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.addEventListener('load', () => {
            script.remove()
            resolve(window[name]);
        });
        script.addEventListener('error', () => {
            script.remove()
            reject(new Error(`Error loading ${url}`));
        });
        script.src = url;
        document.head.appendChild(script);
    })

    return window[name];
}

export function importDynamicComponent(path: string): any {
    const modules = import.meta.glob('@/**/*.vue')
    if (modules[path]) {
        return modules[path]()
    }
    path = path.replace(/^@\//, '/src/')
    return modules[path]()
}

export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}