# AUTHENTICATION SIR CODE

[All Code - Authentication Common Code](AUTHENTICATION%20SIR%20CODE%20178299dbb04a804babdad916ff6f8295/All%20Code%20-%20Authentication%20Common%20Code%20178299dbb04a808c81d2eef558d8aa1a.md)

# dk

```jsx
Spring Security Steps

1. Create Project with Spring Security dependency
2. Create Product Entity/DTO.
3. Create Controller with requried Mapping methods 
   (1 mapping for login, 2-3mappings for post,get)
4. Create Product Service to handle the mappings from controller.
5a. Use default UserId and Password from Spring Security
5. Configure application.properties for create user and password

spring.security.user.name=????
spring.security.user.password=????

<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-security</artifactId>
	</dependency>
</dependencies>

Custom users,password and Roles but without DB (InMemory)
---------------------------------------------------------

1. Authentication
2. Authorization
3. Principal
4. ROLE 
5. GrantedAuthority

6. Create SecurityConfig class with 3 bean methods (authentication, authorization and PasswordEncoder).

Steps:
1. Way to configure Authentication in Spring Security is affecting the Authentication Manager.
2. AM manages the Authentication. It has authenticate() returns boolean value (Successful or failure).
3. Way to affect AM is to configure (Not creating) what AM does using Builder pattern.
4. We wont directly work with AM instead work with AMB  (We get hold of AMB and set the configuration)
5. AMB interacts with User (what type of Authentication user wants, gets credential from user (InMemory Users) - UserInfo, Once AMB configured with this details, new AM will be builded with these InMemory users. So we are not directly dealing with AM.
6. To get hold of AMB, we use configure(AMB) method from SecurityConfig (We extend and override this method). NOTE: There are 2 more configure() overloaded methods too.
7. We shld remove the users from application.properties.
8. create spring security configuration class by extending WebSecurityConfiguredAdapter.

public class SecurityConfiguration extends WebSecurityConfigurerAdapter 
{ 

@Override
protected void configure (AuthenticationManagerBuilder auth) throws Exception 
{
auth.inMemoryAuthentication() 
.withUser("user1")
.password("temp1234")
.roles("USER")
.and()
.withUser("user2")
.password("temp1234")
.roles("ADMIN")
.and()
.withUser("user3")
.password("temp1234")
.roles("USER")

}
}

1. We don't invoke spring security and we don't call its api's, we add spring security starter dependency to your spring boot application and the framework starts intercepting requests right out of the gate. 

2. Filter - Spring security adds itself to the request processing is by adding a filter to our app.

3. Filter is essentially a construct in a servlet application that lets you intercept requests (request is coming which needs to be dispatched to a certain servlet)

4. we can create a bunch of filters and say before this request is handled by the servlet it has to go through these Filters.
5. Filters has the opportunity to do any processing or manipulate the request before it goes to the servlet. It can even stop certain requests so that they don't even reach the servlet.
6. Usually a one-to-one mapping between a URL and a servlet method one URL is typically 
handled by one servlet method but filters can be applied to a wide range of URLs.

7. For Example, we can apply filter to all URLs in the application using the /**

8. In the case of web applications that's what Spring Security does when you drop the spring security starter dependency into your spring boot app,  it does the filter 
mapping to intercept all the requests /** and maps it to spring Security's own filter called delegating Filter Proxy (this used to be done manually in non-spring boot in XML).

Delegating Filter proxy, catch all the filter that spring security adds as a starting point.

It is actually a delegating filter, it doesn't do the job itself but instead it delegates it to a bunch of  other spring security specific filters to do different things depending on the URL being requested or the configuration. 

There are Authentication and Authorization filters.

This is sample XML file for Servlet.

<filter>
<filter-name>springSecurityFilterChain</filter-name>
<filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>

<filter-mapping>
<filter-name>springSecurityFilterChain</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping>

Authentication filter which intercepts all authentication requests and initiates the authentication process (its same case for Authorization too).

How Spring Security do what it does??? We know Authentical filter but what happens after that ??

1. Authentication has an operation (authenticate()) with inputs (Credentials from user) and outputs (boolean but additionally Principal also).

2. Spring Security performs authenticaltion , it keeps track of both input and output using an Object of type Authentication. Authentication is internally an interface. Authentication objects holds credentials before authentication process and holds PRINICPAL after successful authentication.

Authentication Provider
-----------------------

1. Authentication Provider is the actual guy who performs Authentication (there are other several ways Spring Security performs authentication but common way is usign Providers Pattern).
2. Authentication Provider (Interface) is reponsible to perform authentication. This interface only has authenticate() method.

see the documentation of Authentication and Authentication Provide interface for more clarity and view the methods of both interfaces.

3. In typical web or SpringBoot applications, we may have many ways of Authentications such as Basic authentication (credentials) , OAuth , SSO or LDAP . So Single application may have diff types of authentication strategies/mechanism. So APP can have multiple Authentication providers and each one knows how to authenticate with specific mechanism. Each one takes instance of Authenticate Object from Authentication Provider and performs Authentication and returns Authenticate Object (PRINCIPAL).

4. Inorder to co-ordinate with all the Athentication providers , we have Authentication Manager. It also has authenticate() method.  There are diff ways of implementing AM but common implementations is Provide Manager (provide pattern) which does this kind of delegation to authentication provided depending on which provide supports the authentication.

5. Provider Manager doesnt do the work, its just coordinates with all these diff authentication providers depending on Authentication type.

6. Each Authentical Provider also has method called support() return boolean value.

Provide Manager implements Authentication Manager Interface

UserDetail and UserDetailsService
---------------------------------

1. What do these Authetication Providers needs in order to do authentication after getting input (Credentials) from Authetication Provider. So these Authentication provider needs to access the source where these credentials are stored to verify.
2. Irrespective of Authentication provider, every one needs to do this authentication process inorder to verify the credentials (Change could be how they retrieve credentials but after that verfication of authorization is same), so, Spring security has extracted that part (retrieving User information) on its entiry called UserDetailsService (using loadByUserName() method and returns UserDetail Object). UserDetail Object contains all information about the user such as user account is valid, locked,unlocked, credential information).
3. With this Object, Authetication Provider has everything it needs to autheticate.

In Negative scenario (no proper credentials), Authentication provider throws  an AuthenticationException that goes to filter and user sees the exception thrown as error page.

5. We use AMB to configure what AM can do.

Using DB (UserDetailService-DAOAuthentication)
----------------------------------------------

1. Create Entity - User (Customers)

2. Create Repository - CustomerRepository and mainly have findByUsername() method.

3. Update Security Config to update the Authentication Bean method.

//4. Create UserInfoDetails implements UserDetails

5. Create UserInfoDetailsService implements UserDetailsService and override loadByUserName()

6. Update controller to /add (/register) Users

7. Update ProductService to handle add user mapping method.

8. Update SecurityConfig (Authorization) class to allow add mapping to permit all

9. Update SecurityConfig to add 4th Bean method - Authentication Provider

JWT
1. Add JWT required (3) dependencies in POM.XML

2. Update CustomerLoginController to add /authenticate (/login) mapping

3. Create DTO class - LoginRequest

4. Create JWTUtil to have methods mainly generateToken() and all other important methods inside.

5. Update Secuirty Config to add bean method - Authentication Manager
6. Create JWTAuthFilter to handle subsequent Requests.
7. Update SecurityConfig 2nd Bean method to remove formlogin() and add the filter(JWTAuthFilter) we created.
 

---------------

1. Create Entity - User (Customers)
2. Create Repository - CustomerRepository and mainly have findByUsername() method.
3. Update Security Config to update the Authentication Bean method.
//4. Create UserInfoDetails implements UserDetails
5. Create CustomerLoginService implements UserDetailsService and override loadByUserName()
6. Update controller to /add (/register) Users
7. Update CustomerLoginService (implements UserDetailsService) handle add user mapping method (creatUser()).
8. Update SecurityConfig class to allow add mapping to permit all
9. Update SecurityConfig to add 4th Bean method - Authentication Provider

JWT
1. Add JWT required (3) dependencies in POM.XML
2. Update CustomerLoginController to add /authenticate (/login) mapping
3. Create DTO class - LoginRequest
4. Create JWTUtil to have methods mainly generateToken() and all other important methods inside.
5. Update Secuirty Config to add bean method - Authentication Manager
6. Create JWTAuthFilter to handle subsequent Requests.
7. Update SecurityConfig 2nd Bean method to remove formlogin() and add the filter(JWTAuthFilter) we created.

```