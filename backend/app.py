'''
Created on Aug 7, 2020

@author: Alaa
'''
from flask import Flask, render_template, request, redirect, url_for, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import sys
from werkzeug.exceptions import HTTPException
import os

db = SQLAlchemy()


class Todo(db.Model):
    # default if this is not mentioned will be class's name lowercased
    __tablename__ = "todos"
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(), nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    todolist_id = db.Column(db.Integer, db.ForeignKey('todoslists.id'),
        nullable=False)
    def __repr__(self):
        return f'<Todo ID: {self.id}, description: {self.description} , completed : {self.completed}>'

class TodoList(db.Model):
    # default if this is not mentioned will be class's name lowercased
    __tablename__ = "todoslists"
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(), nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    todos = db.relationship('Todo', backref='todolist', lazy=True,cascade="all, delete")
    def __repr__(self):
        return f'<Todo ID: {self.id}, description: {self.description} , completed : {self.completed} , todos: {self.todos}>'


def create_app(test_config=None):
    app = Flask(__name__)
    database_filename = "database.db"
    project_dir = os.path.dirname(os.path.abspath(__file__))
    database_path = "sqlite:///{}".format(os.path.join(project_dir, database_filename))

    app.config['SQLALCHEMY_DATABASE_URI'] = database_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)
    db.create_all()
    CORS(app)

    @app.route('/todos', methods=['POST'])
    def createTodo():
        error = False
        body = {'success': True}
        try:
            description = request.get_json()['description']
            todolist_id = request.get_json()['listId']
            if(len(description) > 0):
                todo = Todo(description=description, completed=False, todolist_id=todolist_id)
                db.session.add(todo)
                db.session.commit()
                body['description'] = todo.description
                body['id'] = todo.id
                body['completed'] = todo.completed
                body['listId'] = todo.todolist_id
            else:
                raise NotImplementedError()
        except NotImplementedError:
            abort(422)
        except:
            error = True
            db.session.rollback()
            print(sys.exc_info())
        finally:
            db.session.close()
        if error:
            abort(400)
        else:
            return(jsonify(body))
    
    @app.route('/todoslists', methods=['POST'])
    def createList():
        error = False
        body = {'success': True}
        try:
            description = request.get_json()['description']
            if(len(description) > 0):
                todoList = TodoList(description=description, completed=False)
                db.session.add(todoList)
                db.session.commit()
                body['description'] = todoList.description
                body['id'] = todoList.id
                body['completed'] = todoList.completed
            else:
                raise NotImplementedError()
        except NotImplementedError:
            abort(422)
        except:
            error = True
            db.session.rollback()
            print(sys.exc_info())
        finally:
            db.session.close()
        if error:
            abort(400)
        else:
            return(jsonify(body))

    @app.route('/todos/<todo_id>', methods=['PATCH'])
    def editTodo(todo_id):
        error = False
        try:
            jsonRequest = request.get_json()

            todo = Todo.query.get(todo_id)
            if(todo is None):

                raise NotImplementedError
            if "completed" in jsonRequest :
                completed = jsonRequest['completed']
                todo.completed = completed
            elif "listId" in jsonRequest:
                todolist_id = jsonRequest["listId"]
                todo.todolist_id =todolist_id
            else:
                raise Exception("")
            db.session.commit()
        except NotImplementedError:
            abort(404)
        except:
            error = True
            abort(400)
            db.session.rollback()
            print(sys.exc_info())
        finally:
            db.session.close()
        return(jsonify({"success": not error}))

    @app.route('/todoslists/<list_id>', methods=['PATCH'])
    def editList(list_id):
        error = False
        todos= []
        try:
            jsonRequest = request.get_json()

            todoList = TodoList.query.get(list_id)
            if(todoList is None):
                raise NotImplementedError
            if "completed" in jsonRequest :
                completed = jsonRequest['completed']
                todoList.completed = completed
                todos = Todo.query.filter(Todo.todolist_id == list_id).all()
                for todo in todos:
                    todo.completed = completed
                todosJson= [{"id": todo.id, "description": todo.description, "completed": todo.completed,"listId":todo.todolist_id} for todo in todos]
            elif "description" in jsonRequest:
                description = jsonRequest['description']
                todoList.description = description
                todosJson= [{"id": todo.id, "description": todo.description, "completed": todo.completed,"listId":todo.todolist_id} for todo in todos]


            else:
                raise Exception("")
            db.session.commit()
        except NotImplementedError:
            abort(404)
        except:
            error = True
            abort(400)
            db.session.rollback()
            print(sys.exc_info())
        finally:
            db.session.close()
        
        return(jsonify({"success": not error, "todos":todosJson}))

    @app.route('/todos/<todo_id>', methods=['DELETE'])
    def deleteTodo(todo_id):
        error = False
        try:
            todo = Todo.query.get(todo_id)
            db.session.delete(todo)
            db.session.commit()
        except Exception as e:
            error = True
            print(e)
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            abort(404)
        else:
            return jsonify({'success': True})

    @app.route('/todoslists/<list_id>', methods=['DELETE'])
    def deleteList(list_id):
        error = False
        try:
            todoList = TodoList.query.get(list_id)
            db.session.delete(todoList)
            db.session.commit()
        except Exception as e:
            error = True
            print(e)
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            abort(404)
        else:
            return jsonify({'success': True})

    @app.route('/todos')
    def todosGet():
        try:
            return(jsonify({"success": True, 'todos': [{"id": todo.id, "description": todo.description, "completed": todo.completed ,"listId":todo.todolist_id} for todo in Todo.query.order_by('id').all()]}))
        except Exception as e:
            print(e)

    @app.route('/todos/<list_id>')
    def todosGetByList(list_id):
        try:
            print("called")
            return(jsonify({"success": True, 'todos': [{"id": todo.id, "description": todo.description, "completed": todo.completed,"listId":todo.todolist_id} for todo in Todo.query.filter(Todo.todolist_id==list_id).order_by('id').all()]}))
        except Exception as e:
            print(e)

    @app.route('/todoslists')
    def listsGet():
        try:
            return(jsonify({"success": True, 'todoslists': [{"id": todolist.id, "description": todolist.description, "completed": todolist.completed} for todolist in TodoList.query.order_by('id').all()]}))
        except Exception as e:
            print(e)
    
    @app.route('/')
    def getAll():
        try:
            return(jsonify({"success": True,
            'todos': [{"id": todo.id, "description": todo.description, "completed": todo.completed,"listId":todo.todolist_id} for todo in Todo.query.order_by('id').all()],
             'todoslists': [{"id": todolist.id, "description": todolist.description, "completed": todolist.completed} for todolist in TodoList.query.order_by('id').all()]}))
        except Exception as e:
            print(e)

    @app.errorhandler(HTTPException)
    def genericErrorHandler(e):
        print("generic error handler")
        return jsonify({
            "success": False,
            "error": e.code,
            "message": e.name
        }), e.code
    return app
