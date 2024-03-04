const baseUrl = 'https://todoo.5xcamp.us';

const apiNext = {
  signin: `${baseUrl}/users/sign_in`,
  signup: `${baseUrl}/users`,
  signout: `${baseUrl}/users/sign_out`,
  check: `${baseUrl}/check`,
  todos: `${baseUrl}/todos`,
  toggle(id) {
    return `${this.todos}/${id}/toggle`;
  },
};

export default apiNext;
