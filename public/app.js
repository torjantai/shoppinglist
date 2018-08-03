'use strict';


$(document).ready(function() {

    const $shoppingListDiv = $('#shopping-list');
    let shoppingListId;
    let $articleInput;
    let $categoryInput;
    let $addItemButton;
    let shoppingListsData = {};
    let shoppingListName = '';
    let shoppingListItemsArray = [];
    let shoppingListItems = '';
    let reserveListItems = '';
    const listIndex = 0;

    function updateShoppingListHTML() {
        $shoppingListDiv.html(`
        <table class="table m-5-md table-striped">
            <h3>${shoppingListName}</h3>
            <thead>
                <tr>
                    <th scope="col">Tuote</th>
                    <th scope="col">Kategoria</th>
                    <th scope="col">Merkitse ostetuksi</th>
                </tr>
            </thead>
            <tbody>
                ${shoppingListItems}

            </tbody>
        </table>

        <table class="table m-5-md table-striped">
        <h5>Ostetut</h5>
        <thead>
        <tr>
        <th scope="col">Tuote</th>
        <th scope="col">Kategoria</th>
        <th scope="col">Siirrä ostoslistalle</th>
        </tr>
        </thead>
        <tbody>
        ${reserveListItems}
        </tbody>
        </table>
        `)
        shoppingListId = shoppingListsData[listIndex]._id;
        console.log(shoppingListId);
        $articleInput = $('#article-input');
        $categoryInput = $('#category-input');
        $addItemButton = $('#add-item');
        $addItemButton.on('click', function() {
            console.log('add clicked');
            $.ajax({
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                // processData: false,
                url: `/shoppinglist/${shoppingListId}/items`,
                data: JSON.stringify({article: $articleInput.val(), category: $categoryInput.val(), isNeeded: true}),

                // data: {"article": $articleInput.val(), "category": $categoryInput.val(), "isNeeded": "true"},
                success: function (data, status, jqXHR) {
                    console.log('success!!')

                }
            });
        });

    }

    function updateShoppingListItemsHTML() {
        shoppingListItemsArray.forEach(function(item) {
            if (item.isNeeded === true)
            shoppingListItems += `
                                <tr>
                                <td>${item.article}</td>
                                <td>${item.category}</td>

                                <td><button id="remove-item" type="button" class="btn btn-primary">Ostettu</button>
                                </tr>
                                `;
            else reserveListItems +=`
                                <tr>
                                <td>${item.article}</td>
                                <td>${item.category}</td>

                                <td><button id="move-item" type="button" class="btn btn-primary">Siirrä</button>
                                </td>
                                </tr>
                                `;

        });
        shoppingListItems += `
                            <tr>
                                <td>
                                    <input id="article-input" type="text" class="form-control" placeholder="Lisää tuote" aria-label="Tuote"
                                            aria-describedby="basic-addon1">
                                </td>
                                <td>
                                    <input id="category-input" type="text" class="form-control" placeholder="Kategoria" aria-label="Kategoria"
                                            aria-describedby="basic-addon1">
                                </td>
                                <td>
                                    <button id="add-item" type="button" class="btn btn-primary">Lisää</button>
                                </td>

                            </tr>



                            `

    }



    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/shoppinglist",
        data: {},
        success:    function(data, status, jqXHR) {
                        shoppingListsData = data;
                        console.log(data);
                        shoppingListName = data[listIndex].listName;
                        shoppingListItemsArray = data[listIndex].items;
                        console.log(shoppingListItemsArray);

                        updateShoppingListItemsHTML()
                        updateShoppingListHTML();
                    }
    });




}); //end ready
