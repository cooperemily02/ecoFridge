let current = [];
$(function(){
    let ingstr;
    var ms = $('#ms-scrabble').magicSuggest({
        placeholder:'',
        allowFreeEntries:true,
        autoSelect:true,
        matchCase:true,
        maxDropHeight:145,
        selectionPosition:"bottom",
        selectionStacked:true,
        strictSuggest:true,
        toggleOnClick:true,
        useZebraStyle:true,
        data: [
            'Milk',
            'Eggs', 
            'Peanut Butter', 
            'Sugar',
            'Lettuce',
            'Pineapple',
            'Olive oil',
            'All purpose flour',
            'Butter',
            'Chicken',
            'Salt',
            'Egg',
            'Rice',
            'Vegetable oil',
            'Pork',
            'Beef',
            'Cheese',
            'Garlic',
            'Orange',
            'Turkey',
            'Onion',
            'Corn',
            'Whole milk',
            'Mayonnaise',
            'Chiles',
            'Almonds',
            'Bacon',
            'Mushrooms',
            'Coconut',
            'Beets',
            'Strawberries',
            'Lamb',
            'Apple',
            'Shrimp',
            'Greek yogurt', 
           'Cottage Cheese', 
            'Yogurt',
            'Whipping Cream', 
           'Sour Cream',
           'Ground Beef', 
            'Pepperoni', 
            'Salami', 
            'Hot Dogs,',
            'Green Beans', 
            'Grape Tomatoes',  
            'Pickles', 
            'Cucumber',
            'Zucchini', 
            'Cauliflower', 
            'Spinach',
        ]
    });
    $(ms).on('selectionchange', function(){
        console.log((JSON.stringify(this.getSelection())));
        current = this.getSelection();
        
      });
})
document.getElementById('button1').onclick = function getRecipes() {
    let str = '';
    for(let i = 0; i<current.length; i++ )
    {
        let newingredient = current[i].name;
        str+=newingredient;
        if(i<current.length-1)
        {
            str+=',';
        }
    }
    
    let checkboxes = document.getElementsByName('cuisine');
    let cuisstr = "";
    for(var i = 0; i < checkboxes.length; i++)  
    {  
        if(checkboxes[i].checked)  
            {
                cuisstr+=checkboxes[i].id;
                if(i<checkboxes.length-1)
                {
                    cuisstr+=',';
                }
            }
    }  

    let allergy = document.getElementById('allergies').value;
    let restriction = document.getElementById('diet').value;

    console.log(cuisstr);
    console.log(current.length);
    let url = 'https://api.spoonacular.com/recipes/complexSearch?includeIngredients=' + str + '&cuisine=' + cuisstr + '&excludeIngredients=' + allergy + '&diet=' + restriction + '&number=10&apiKey=c26afc8148f444438f7935c1f1d4298f';
    fetch(url).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data)
        console.log(data.totalResults)
        if(data.totalResults == 0)
        {
            alert("No results!");
        }
        for (let i = 0; i<data.totalResults; i++)
        {
            createCard(data.results[i])
        }

    })

}

function createCard(recid)
{
    let url2 = 'https://api.spoonacular.com/recipes/' + recid.id + '/information?apiKey=c26afc8148f444438f7935c1f1d4298f';
    let recipelink;
    fetch(url2).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data)
        recipelink = data.sourceUrl;
        
        let arlink = document.createElement('a');
        arlink.setAttribute('href', recipelink);
        arlink.setAttribute('target', '_blank');
        document.body.appendChild(arlink);

            let newcard = document.createElement('div');
            newcard.setAttribute('class', "card");
            arlink.appendChild(newcard);

            let recimg = document.createElement('img');
            recimg.setAttribute('src', recid.image);
            newcard.appendChild(recimg);

            let newcontainer = document.createElement('div');
            newcontainer.setAttribute('class', 'container');
            newcard.appendChild(newcontainer);
            
                let title = document.createElement('h4');
                title.innerHTML = recid.title;
                newcontainer.appendChild (title);

        
    })


 





}

document.getElementById('restart').onclick = function restart() {
    location.reload();
}
/*for(let i = 0; i<current.length; i++ )
{
    let newingredient = current[i].name;
    str+=newingredient;
    if(i<current.length-1)
    {
        str+=',';
    }
}
*/
