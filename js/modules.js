

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝


// Get index in array of a given object id
function getIndexById(array, id) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			return i;
		}
	}
}

// Calculate a consistent new id in array (max of existing id + 1)
function newId(array) {
	const maxId = Math.max.apply(Math, array.map((element) => {
		return element.id;
	}));
	return maxId + 1;
}



// ███╗   ███╗ ██████╗ ██████╗  █████╗ ██╗             ██╗    ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗
// ████╗ ████║██╔═══██╗██╔══██╗██╔══██╗██║            ██╔╝    ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║
// ██╔████╔██║██║   ██║██║  ██║███████║██║           ██╔╝     ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══██║██║          ██╔╝      ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║  ██║███████╗    ██╔╝       ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚═╝        ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝


// Modal
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.handleClickClose = this.handleClickClose.bind(this);
	}

	handleClickClose() {
		this.props.onClickClose();
	}

	render() {
		return(
			<div className='modal'>
				<div className='modal-content'>
					<span className='modal-close' onClick={this.handleClickClose}>&times;</span>
					<div>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}


// Form
class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title,
			description: this.props.description
		}
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
			<form>
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
					   value='Valider'
					   onClick={this.handleSubmit} />	
			</form>
		);
	}
}


// Button to add a module
class ButtonAdd extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick() {
		this.props.onClick();
	}


	render() {
		return(
			<button className='btn-add' onClick={this.handleClick}>
				<i className='fas fa-plus icon'></i>
				Ajouter un module
			</button>
		);
	}
}



// ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗██╗     ███████╗
// ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║     ██╔════╝
// ██╔████╔██║██║   ██║██║  ██║██║   ██║██║     █████╗  
// ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║██║     ██╔══╝  
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████╗███████╗
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝


// Description of module
function ModuleBody(props) {
	return(
		<div className='module-body'>
			{props.description}
		</div>
	);
}


// Title + Edit button + Delete button of module
class ModuleHeader extends React.Component {
	constructor(props) {
		super(props);
		this.handleIsCollapsedChange = this.handleIsCollapsedChange.bind(this);
	}

	handleIsCollapsedChange() {
		this.props.onIsCollapsedChange();
	}

	render() {
		return(
			<div className='module-header'>
				<p className='module-header-title' onClick={this.handleIsCollapsedChange}>
					{this.props.title}
				</p>
				{this.props.children}
			</div>
		);
	}
}


// Module (manages view + edit/delete modals)
class Module extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isCollapsed: true,
			showEditModal: false,
			showDeleteModal: false
		}
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
					<div>
						<button className='btn-header' onClick={this.handleShowEditModalChange}>
							<i className='fas fa-pencil-alt'></i>
						</button>
						<button className='btn-header' onClick={this.handleShowDeleteModalChange}>
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
					<Modal onClickClose={this.handleShowEditModalChange}>
						<h3>Modifier un module</h3>
						
						<Form title={this.props.module.title}
							  description={this.props.module.description}
							  onSubmit={this.handleModuleEdit} />
					</Modal>
				}
				
				{/*Modal to delete module*/}
				{ this.state.showDeleteModal &&
					<Modal onClickClose={this.handleShowDeleteModalChange}>
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


class ModuleList extends React.Component {
	constructor(props) {
		super(props);
		this.handleModuleEdit = this.handleModuleEdit.bind(this);
		this.handleModuleDelete = this.handleModuleDelete.bind(this);
	}


	handleModuleEdit(module) {
		this.props.onModuleEdit(module);
	}

	handleModuleDelete(module) {
		this.props.onModuleDelete(module);
	}


	render() {
		const listModules = this.props.modules.map((module) =>
			<Module key={module.id}
					module={module}
					onModuleEdit={this.handleModuleEdit}
					onModuleDelete={this.handleModuleDelete} />
		);
		
		return(
			<div>
		    	{listModules}
		    </div>
		);
	}
}




class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modules: this.props.modules,
			showAddModal: false
		}
		this.handleShowAddModalChange = this.handleShowAddModalChange.bind(this);
		this.handleModulesChange = this.handleModulesChange.bind(this);
		this.handleModuleAdd = this.handleModuleAdd.bind(this);
		this.handleModuleDelete = this.handleModuleDelete.bind(this);
	}


	handleShowAddModalChange() {
		this.setState({
			showAddModal: !this.state.showAddModal
		})
	}

	handleModulesChange(module, toDelete = false) {
		const modules = this.state.modules.slice();
		
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
			
			if (toDelete) {
				modules.splice(index, 1);
			}
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
				
				<ModuleList modules={this.state.modules}
							onModuleEdit={this.handleModulesChange}
							onModuleDelete={this.handleModuleDelete} />
				
				<ButtonAdd onClick={this.handleShowAddModalChange} />
				
				{ this.state.showAddModal &&
					<Modal onClickClose={this.handleShowAddModalChange}>
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


ajaxGet("../data/modules.json", (response) => {
    const MODULES = JSON.parse(response);

    ReactDOM.render(
		<Dashboard modules={MODULES} />,
		document.getElementById('content')
	);
});


// const MODULES = [
// 	{id: 1, title: 'Module A', description: 'Description du module A'},
// 	{id: 2, title: 'Module B', description: 'Description du module B'},
// 	{id: 3, title: 'Module C', description: 'Description du module C'},
// 	{id: 4, title: 'Module D', description: 'Description du module D'},
// 	{id: 5, title: 'Module E', description: 'Description du module E'}
// ];
// 
// ReactDOM.render(
// 	<Dashboard modules={MODULES} />,
// 	document.getElementById('content')
// );
