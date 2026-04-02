#user.py

class User:
    def __init__(self, user_id: int, name: str, email: str, password: str):
        # User attributes
        self.userID = user_id
        self.name = name
        self.email = email
        self.password = password

    # + update_name(updated_email: str): void
    def update_name(self, updated_name: str):
        '''
        Updates the users name
        '''
        self.name = updated_name

    # + update_email(updated_email: str): void
    def update_email(self, updated_email: str):
        '''
        Updates the users email
        '''
        self.email = updated_email

    # + update_password(updated_password: str): void
    def update_password(self, updated_password: str):
        '''
        Updates the users password
        '''
        self.password = updated_password