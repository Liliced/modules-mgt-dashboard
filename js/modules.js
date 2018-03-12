

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝


// Get index in array of a given object id
// Called by Dashboard when updating or deleting a module
function getIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return i;
        }
    }
}

// Calculate a consistent new id in array (max of existing id + 1)
// Called by Dashboard to creating a module
function newId(array) {
    const maxId = Math.max.apply(Math, array.map((element) => {
        return element.id;
    }));
    return maxId + 1;
}



// ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗██╗     ███████╗        ██╗    ███████╗ ██████╗ ██████╗ ███╗   ███╗
// ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║     ██╔════╝       ██╔╝    ██╔════╝██╔═══██╗██╔══██╗████╗ ████║
// ██╔████╔██║██║   ██║██║  ██║██║   ██║██║     █████╗        ██╔╝     █████╗  ██║   ██║██████╔╝██╔████╔██║
// ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║██║     ██╔══╝       ██╔╝      ██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████╗███████╗    ██╔╝       ██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝    ╚═╝        ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝


// *** Rendered by Module ***
// Returns a div with "X" close + form (as props child)
// Props : function to handle "close modal" event
function Modal(props) {
    return(
        <div className='modal'>
            <div className='modal-content'>
                <span aria-label='Fermer' className='modal-close' onClick={props.onClose}>&times;</span>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    );
}


// *** Rendered by Module ***
// Returns a form with input title + textarea description
// State :
// - value of title
// - value of description
// Functions to handle :
// - state changes (input values)
// - event "form submit"
// Props :
// - string title
// - string description
// - function to handle form submit
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const title = this.state.title;
        const description = this.state.description;
        
        this.props.onSubmit(title, description);
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label htmlFor='title'>Titre :</label>
                    <input name='title'
                           type='text'
                           value={this.state.title}
                           onChange={this.handleInputChange}
                           required />
                </p>
                <p>
                    <label htmlFor='description'>Description :</label>
                    <textarea name='description'
                              value={this.state.description}
                              onChange={this.handleInputChange} />
                </p>
                <input type='submit'
                       value='Valider' />
            </form>
        );
    }
}


// *** Rendered by Dashboard ***
// Returns a button "add a module"
// Props : function to handle click
function ButtonAdd(props) {
    return(
        <button className='btn-add' onClick={props.onClick}>
            <i className='fas fa-plus icon'></i>
            Ajouter un module
        </button>
    );
}



// ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗██╗     ███████╗
// ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║     ██╔════╝
// ██╔████╔██║██║   ██║██║  ██║██║   ██║██║     █████╗  
// ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║██║     ██╔══╝  
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████╗███████╗
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝


// *** Rendered by Module ***
// Returns a div with description of module
// Props : string description
function ModuleBody(props) {
    return(
        <div className='module-body'>
            {props.description}
        </div>
    );
}


// *** Rendered by Module ***
// Returns a div with Title + Edit/Delete button (as props children)
// Props :
// - string title
// - function to handle ModuleBody collapse
function ModuleHeader(props) {
    return(
        <div className='module-header'>
            <p className='module-header-title' onClick={props.onIsCollapsedChange}>
                {props.title}
            </p>
            {props.children}
        </div>
    );
}


// *** Rendered by ModuleList ***
// Return :
// - ModuleHeader component with module title + edit/delete buttons
// - [ModuleBody component with module description (if not collapsed)]
// - [Modal "edit module" with edit form (if visible)]
// - [Modal "delete module" with confirmation button (if visible)]
// State :
// - boolean of ModuleBody collapse
// - boolean of EditModal visibility
// - boolean of DeleteModal visibility
// Functions to handle :
// - state changes (ModuleBody and Modals visibility)
// - event "edit module"
// - event "delete module"
// Props :
// - object module (id, title and description)
// - function to handle event "edit module"
// - function to handle event "delete module"
class Module extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true,
            showEditModal: false,
            showDeleteModal: false
        };
        this.handleIsCollapsedChange = this.handleIsCollapsedChange.bind(this);
        this.handleShowEditModalChange = this.handleShowEditModalChange.bind(this);
        this.handleShowDeleteModalChange = this.handleShowDeleteModalChange.bind(this);
        this.handleModuleEdit = this.handleModuleEdit.bind(this);
        this.handleModuleDelete = this.handleModuleDelete.bind(this);
    }


    handleIsCollapsedChange() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    }

    handleShowEditModalChange() {
        this.setState({
            showEditModal: !this.state.showEditModal
        });
    }

    handleShowDeleteModalChange() {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
    }

    handleModuleEdit(title, description) {
        const editedModule = {
            id: this.props.module.id,
            title: title,
            description : description
        };
        
        this.props.onModuleEdit(editedModule);
        
        this.handleShowEditModalChange();
    }

    handleModuleDelete() {
        this.props.onModuleDelete(this.props.module);
        
        this.handleShowDeleteModalChange();
    }


    render() {
        return(
            <div className='module'>
                
                {/*Module title + edit/delete buttons*/}
                <ModuleHeader title={this.props.module.title}
                              onIsCollapsedChange={this.handleIsCollapsedChange}>
                    <div className='flex'>
                        <button aria-label='Modifier' className='btn-header'
                                onClick={this.handleShowEditModalChange}>
                            <i className='fas fa-pencil-alt'></i>
                        </button>
                        <button aria-label='Supprimer'className='btn-header'
                                onClick={this.handleShowDeleteModalChange}>
                            <i className='fas fa-trash-alt'></i>
                        </button>
                    </div>
                </ModuleHeader>

                {/*Module description (if not collapsed)*/}
                { !this.state.isCollapsed &&
                    <ModuleBody description={this.props.module.description}  />
                }
                
                {/*Modal to edit module*/}
                { this.state.showEditModal &&
                    <Modal onClose={this.handleShowEditModalChange}>
                        <h3>Modifier un module</h3>
                        
                        <Form title={this.props.module.title}
                              description={this.props.module.description}
                              onSubmit={this.handleModuleEdit} />
                    </Modal>
                }
                
                {/*Modal to delete module*/}
                { this.state.showDeleteModal &&
                    <Modal onClose={this.handleShowDeleteModalChange}>
                        <h3>Supprimer un module</h3>
                        
                        <div className='modal-delete-content'>
                            <p>Confirmez-vous la suppression de "{this.props.module.title}" ?</p>
                            <button className='btn-delete' onClick={this.handleModuleDelete}>Supprimer</button>
                        </div>
                    </Modal>
                }
            </div>
        );
    }
}



// ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
// ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
// ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
// ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
// ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
// ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 


// *** Rendered by Dashboard ***
// Goes through the array of modules and convert them into Module components
// Props :
// - array of modules
// - function to handle event "edit module"
// - function to handle event "delete module"
class ModuleList extends React.Component {
    render() {
        const listModules = this.props.modules.map((module) =>
            <Module key={module.id}
                    module={module}
                    onModuleEdit={this.props.onModuleEdit}
                    onModuleDelete={this.props.onModuleDelete} />
        );
        
        return(
            <div>
                {listModules}
            </div>
        );
    }
}


// Main component
// Return :
// - ModuleList component with the list of modules
// - ButtonAdd component to show modal "AddModal" to create a module
// - [Modal component AddModal (if visible)]
// State :
// - array of modules
// - boolean storing wether AddModal must be visible or not
// Functions to handle :
// - state changes (AddModal visibility + create/update/delete module)
// - event "add module"
// - event "delete module"
// Props :
// - original list of modules
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: this.props.modules,
            showAddModal: false
        };
        this.handleShowAddModalChange = this.handleShowAddModalChange.bind(this);
        this.handleModulesChange = this.handleModulesChange.bind(this);
        this.handleModuleAdd = this.handleModuleAdd.bind(this);
        this.handleModuleDelete = this.handleModuleDelete.bind(this);
    }


    handleShowAddModalChange() {
        this.setState({
            showAddModal: !this.state.showAddModal
        });
    }

    // Function to handle create, update and delete of modules
    handleModulesChange(module, toDelete = false) {
        const modules = this.state.modules.slice();
        
        // Case "create a module"
        if (!module.id) {
            const newModule = {
                id: newId(modules),
                title: module.title,
                description: module.description
            };
            
            modules.push(newModule);
        }
        else {
            const index = getIndexById(modules, module.id);
            // Case "delete a module"
            if (toDelete) {
                modules.splice(index, 1);
            }
            // Case "update a module"
            else {
                modules[index].title = module.title;
                modules[index].description = module.description;
            }
        }
        
        this.setState({
            modules: modules
        });
    }

    handleModuleAdd(title, description) {
        const newModule = {
            title: title,
            description: description
        }
        
        this.handleModulesChange(newModule);
        
        this.handleShowAddModalChange();
    }

    handleModuleDelete(module) {
        this.handleModulesChange(module, true);
    }


    render() {
        return(
            <div>
                <h1>Liste des modules</h1>
                
                {/*List of all modules*/}
                <ModuleList modules={this.state.modules}
                            onModuleEdit={this.handleModulesChange}
                            onModuleDelete={this.handleModuleDelete} />
                
                {/*Button to show modal to create a module*/}
                <ButtonAdd onClick={this.handleShowAddModalChange} />
                
                {/*Modal with form to create a new module*/}
                { this.state.showAddModal &&
                    <Modal onClose={this.handleShowAddModalChange}>
                        <h3>Ajouter un module</h3>
                        <Form title=''
                              description=''
                              onSubmit={this.handleModuleAdd} />
                    </Modal>
                }
            </div>
        );
    }
}



// ██████╗  █████╗ ████████╗ █████╗ 
// ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
// ██║  ██║███████║   ██║   ███████║
// ██║  ██║██╔══██║   ██║   ██╔══██║
// ██████╔╝██║  ██║   ██║   ██║  ██║
// ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

// Data fixture is fetched from a json file with AJAX
ajaxGet("data/modules.json", (response) => {
    const MODULES = JSON.parse(response);

    ReactDOM.render(
        <Dashboard modules={MODULES} />,
        document.getElementById('content')
    );
});