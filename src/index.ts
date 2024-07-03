
import type { User } from './types';
import { createIoCContainer } from './ioc';

const IoC = createIoCContainer();

const renderUsers = async () => {

  const usersService = IoC.resolve('users');
  
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;
  IoC.register('apiConfig', config.api);
  

  renderUsers();
};

window.onload = (event: Event) => {
  const logger = IoC.resolve('logger')

  logger.info('Page is loaded.');

  app();
};
