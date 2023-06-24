import { User } from './user.interface'
import { CognitoUserAttribute, CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'

export class AuthService {
	readonly #userPool: CognitoUserPool

	constructor() {
		this.#userPool = new CognitoUserPool({
			UserPoolId: process.env.USER_POOL_ID!,
			ClientId:  process.env.CLIENT_ID!
		})
	}

	public register(user: User): Promise<void> {
		return new Promise((resolve, reject) => {
			const attributeList = [
				new CognitoUserAttribute({ Name: 'given_name', Value: user.name }),
				new CognitoUserAttribute({ Name: 'family_name', Value: user.surname }),
				new CognitoUserAttribute({ Name: 'address', Value: user.address }),
				new CognitoUserAttribute({ Name: 'email', Value: user.email })
			]

			this.#userPool.signUp(user.email, user.password, attributeList, [], err => {
				if (err) {
					console.log('Error: ', err)
					reject(err)
				}

				resolve()
			})
		})
	}

	public login(email: string, password: string): Promise<boolean> {
		const authenticationDetails = new AuthenticationDetails({
			Username: email,
			Password: password
		})

		//    Username: 'taller21@gmail.com',
		//    Password: 'TallerPassword#123',

		const userData = {
			Username: email,
			Pool: this.#userPool
		}

		const cognitoUser = new CognitoUser(userData)

		return new Promise(resolve => {
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: function () {
					resolve(true)
				},
				onFailure: function (err) {
					console.log(err)
					resolve(false)
				}
			})
		})
	}
}
