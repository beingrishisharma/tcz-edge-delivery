async function fetchData(url) {
    try {
        // Use fetch to make the API call
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Use the data from the response
        return data;
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Error fetching data: ", error);
    }
}


async function createSelect(fd) {
    const select = document.createElement('select');
    select.id = fd.Field;
    if (fd.Placeholder) {
        const ph = document.createElement('option');
        ph.textContent = fd.Placeholder;
        ph.setAttribute('selected', '');
        ph.setAttribute('disabled', '');
        select.appendChild(ph);
    }

    if (fd.Dynamic == "true") {
        const apiURL = "https://replatformuat.blob.core.windows.net/uat/node/assets/master-data/locations-master/countries.json";

        const data = await fetchData(apiURL);

        data.forEach(function(item) {
            const option = document.createElement("option");
            option.value = item.name;
            option.text = item.name;
            select.appendChild(option);
        });
    }
    return select;
}

function createButton(fd) {
    const div = document.createElement('div');
    div.classList.add('grid');
    div.classList.add('grid-3');

    const button = document.createElement('button');
    button.textContent = fd.Placeholder;
    button.classList.add('button');
    button.classList.add('btn-grid');

    div.append(button);
    return div;
}

function createInput(fd) {
    const input = document.createElement('input');
    input.type = fd.Type;
    input.id = fd.Field;
    input.setAttribute('placeholder', fd.Placeholder);
    return input;
}

function createTextArea(fd) {
    const input = document.createElement('textarea');
    input.id = fd.Field;
    input.setAttribute('placeholder', fd.Placeholder);
    return input;
}

export async function createForm(formURL) {
    const { pathname } = new URL(formURL);
    const resp = await fetch(pathname);
    const json = await resp.json();

    const form = document.createElement("form");
    form.className = "my-form";

    const container = document.createElement("div");
    container.className = "container";
    
    const contentWrapper = document.createElement("ul");

    json.data.forEach(async (fd) => {
        fd.Type = fd.Type || "text";
        const li = document.createElement("li");
        switch (fd.Type) {
            case "select":
                li.append(await createSelect(fd))
                contentWrapper.append(li);
                break;
            case "email":
                li.append(await createInput(fd))
                contentWrapper.append(li);
                break;
            case "checkbox":
                // li.append(await createInput(fd))
                // contentWrapper.append(li);
                break;
            case 'text-area':
                li.append(await createTextArea(fd))
                contentWrapper.append(li);
                break;
            case 'submit':
                li.append(await createButton(fd));
                contentWrapper.append(li);
                break;
            default:
                li.append(await createInput(fd))
                contentWrapper.append(li);
        }

        container.append(contentWrapper);
        form.append(container);
    });

    //   fill(form);
    return (form);
}

export default async function decorate(block) {
    const form = block.querySelector('a[href$=".json"]');
    if (form) {
        form.replaceWith(await createForm(form.href));
    }
}
