package br.com.esig.bean;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import br.com.esig.control.TodoManager;
import br.com.esig.model.Todo;

@Named
@ViewScoped
public class TodoBean implements Serializable {

	private List<Todo> todos;

	private Todo todo = new Todo();

	private int tipo;

	@Inject
	private TodoManager todoManager;

	@PostConstruct
	public void init() {
		this.listByTipo(1);
	}

	public void listByTipo(final int tParam) {
		if (tParam != -1) {
			this.tipo = tParam;
		}
		if (this.tipo == 1) {
			this.listAll();
		} else if (this.tipo == 2) {
			this.listActive();
		} else if (this.tipo == 3) {
			this.listCompleted();
		}
	}

	public void listByTipo() {
		this.listByTipo(-1);
	}

	private void listAll() {
		this.todos = this.todoManager.findAll();
	}

	private void listActive() {
		this.todos = this.todoManager.findByCompleted(false);
	}

	private void listCompleted() {
		this.todos = this.todoManager.findByCompleted(true);
	}

	public void delete(final Todo todo) {
		this.todoManager.delete(todo);
		this.listByTipo();
		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Remove successful"));
	}

	public void clearCompleted() {
		this.todoManager.deleteCompleted();
		this.listByTipo();
		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Update successful"));
	}

	public void add() {
		if (this.todo.getDescription() == null || "".equals(this.todo.getDescription().trim())) {
			FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Description is empty", "Description is empty"));
			return;
		}
		this.todoManager.save(this.todo);
		this.listByTipo();
		this.todo = new Todo();
		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Save successful"));
	}

	public void update(final Todo t) {
		this.todoManager.update(t);
		this.listByTipo();
		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Update successful"));
	}

	public List<Todo> getTodos() {
		return this.todos;
	}

	public void setTodos(final List<Todo> todos) {
		this.todos = todos;
	}

	public Todo getTodo() {
		return this.todo;
	}

	public void setTodo(final Todo todo) {
		this.todo = todo;
	}

	public TodoManager getTodoManager() {
		return this.todoManager;
	}

	public void setTodoManager(final TodoManager todoManager) {
		this.todoManager = todoManager;
	}

	public Long getQtdItensLeft() {
		return this.todoManager.getQtdItensLeft();
	}

	public boolean isAll() {
		return this.tipo == 1;
	}

	public boolean isActive() {
		return this.tipo == 2;
	}

	public boolean isCompleted() {
		return this.tipo == 3;
	}

}
