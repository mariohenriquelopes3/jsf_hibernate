package br.com.esig.control;

import java.io.Serializable;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import br.com.esig.model.Todo;

@Stateless
public class TodoManager implements Serializable {

	@PersistenceContext(unitName = "jsf_hibernate")
	private EntityManager entityManager;

	public List<Todo> findAll() {
		return this.entityManager.createQuery("SELECT t FROM Todo t", Todo.class).getResultList();
	}

	public List<Todo> findByCompleted(final boolean completed) {
		final TypedQuery<Todo> query = this.entityManager.createQuery("SELECT t FROM Todo t where t.completed = :completed", Todo.class);
		query.setParameter("completed", completed);
		return query.getResultList();
	}

	public void save(final Todo todo) {
		this.entityManager.persist(todo);
	}

	public void delete(final Todo todo) {
		final Query query = this.entityManager.createQuery("DELETE FROM Todo t WHERE t.id = :id");
		query.setParameter("id", todo.getId());
		query.executeUpdate();
	}

	public void deleteCompleted() {
		final Query query = this.entityManager.createQuery("DELETE FROM Todo t WHERE t.completed = true");
		query.executeUpdate();
	}

	public void update(final Todo todo) {
		this.entityManager.merge(todo);
	}

	public Long getQtdItensLeft() {
		final Query q = this.entityManager.createQuery("SELECT count(t) FROM Todo t where t.completed = false");
		return (Long) q.getSingleResult();
	}

}
