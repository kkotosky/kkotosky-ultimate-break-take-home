export function User(user) {
  return Object.assign(
    user,
    getFullName(user),
    getFormattedDob(user)
  );
};

const getFullName = (state) => ({
  getFullName() {
    const formattedTitle = state.title ?
      `${state.title.charAt(0).toUpperCase()}${state.title.slice(1)}`: '';
    return `${formattedTitle} ${state.name} ${state.surname}`.trim();
  }
});

const getFormattedDob = (state) => ({
  getFormattedDob() {
    return state.birthday ? new Date(state.birthday.raw).toLocaleDateString() : '';
  }
});