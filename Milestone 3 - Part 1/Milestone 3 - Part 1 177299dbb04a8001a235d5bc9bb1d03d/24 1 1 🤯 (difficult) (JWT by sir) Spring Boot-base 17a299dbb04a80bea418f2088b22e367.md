# 24.1.1 🤯 (difficult) (JWT by sir) Spring Boot-based web application for a simplified Event Management System implements JWT

# 24.1.1 ….. (JWT by sir) **Spring Boot-based web application for a simplified Event Management System implements JWT**

# config/SecurityConfig.java

```jsx
package com.wecp.simplified_event_management_jwt.config;

import com.wecp.simplified_event_management_jwt.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
// public class SecurityConfig  {
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // implement security configuration here
    // register, login should be permitted to all
    // all other requests should be authenticated with valid JWT token

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception{

        http.csrf().disable()
                    .authorizeRequests()
                    .antMatchers("/users/register", "/users/login").permitAll()
                    .anyRequest().authenticated()
                    .and()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); 
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManager();
    }

}

```

# jwt

## JwtRequestFilter.java

```jsx
package com.wecp.simplified_event_management_jwt.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    // implement jwt request filter here
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ") ){
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUserName(jwt);
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() ==  null ){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if(jwtUtil.validateToken(jwt, userDetails) ) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

            }
        }

        chain.doFilter(request, response);

    }

}

```

## JwtUtil.java

```jsx
package com.wecp.simplified_event_management_jwt.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
    // implement jwt util here

    private String SECRET_KEY = "secretKey00000000000000000000000000000000000000000000000000000000000000000000000000000000";

    public String extractUserName(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver ) {
        // final Claims claims = extractClaims(token);
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject ){
        return Jwts.builder().setClaims(claims).setSubject(subject)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10 ))
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token) );
    }

    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}

```

co

# controller

## AuthController.java

```jsx
package com.wecp.simplified_event_management_jwt.controller;

import com.wecp.simplified_event_management_jwt.dto.AuthRequest;
import com.wecp.simplified_event_management_jwt.dto.AuthResponse;
import com.wecp.simplified_event_management_jwt.entity.User;
import com.wecp.simplified_event_management_jwt.jwt.JwtUtil;
import com.wecp.simplified_event_management_jwt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@Controller
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/users/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // register user and return the created user
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/users/login")
    public ResponseEntity<AuthResponse> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
       // login user and return the jwt token in AuthResponse object (check provided class AuthRequest and AuthResponse)
        // reuturn 401 unauthorized if login fails

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password", e);
        }

        final UserDetails userDetails = userService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt));

    }

}
```

## EventController.java

```jsx
package com.wecp.simplified_event_management_jwt.controller;

import com.wecp.simplified_event_management_jwt.entity.Event;
import com.wecp.simplified_event_management_jwt.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class EventController {

    @Autowired
    private EventService eventService;
    
    
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getAllEvents() {
        // return all events
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @PostMapping("/events/rsvp/{eventId}/{userId}")
    public ResponseEntity<?> rsvpToEvent(@PathVariable Long eventId, @PathVariable Long userId) {
        // rsvp to the event with eventId for the user with userId

        eventService.rsvpToEvent(eventId, userId);
        return ResponseEntity.ok().build();

    }
}
```

# Service

## EventService.java

```jsx
package com.wecp.simplified_event_management_jwt.service;

import com.wecp.simplified_event_management_jwt.entity.Event;
import com.wecp.simplified_event_management_jwt.entity.User;
import com.wecp.simplified_event_management_jwt.repository.EventRepository;
import com.wecp.simplified_event_management_jwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    // implement event service here
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Event> getAllEvents(){
        return eventRepository.findAll();
    }

    public void rsvpToEvent(Long eventId, Long userId) {        
        Event event = eventRepository.findById(eventId).orElseThrow( () -> new RuntimeException("Event not found") );        

        User user = userRepository.findById(userId).orElseThrow( () -> new RuntimeException("User not found") );

        event.getParticipants().add(user);
        user.getRsvpedEvents().add(event);

        eventRepository.save(event);
        userRepository.save(user);

    }

}

```

## UserService.java

```jsx
package com.wecp.simplified_event_management_jwt.service;

import com.wecp.simplified_event_management_jwt.entity.User;
import com.wecp.simplified_event_management_jwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    // implement user service here
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user){
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username);

        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

}
```

# Repository

## EventRepository

```jsx
package com.wecp.simplified_event_management_jwt.repository;

import com.wecp.simplified_event_management_jwt.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // implement repository
}
```

## UserRepository

```jsx
package com.wecp.simplified_event_management_jwt.repository;

import com.wecp.simplified_event_management_jwt.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // implement repository
    User findByUsername(String username);
}
```

# (DTO → AuthRequest, [AuthResponse.java](http://AuthResponse.java) → already code given.)

# Entity

## User.java

```jsx
package com.wecp.simplified_event_management_jwt.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users") // do not change this line (table name)
public class User {
    // implement user entity here

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;    

    private String username;
    private String email;
    private String password;

    @ManyToMany
    private Set<Event> rsvpedEvents = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Event> getRsvpedEvents() {
        return rsvpedEvents;
    }

    public void setRsvpedEvents(Set<Event> rsvpedEvents) {
        this.rsvpedEvents = rsvpedEvents;
    }

    

}
```

## Event.java

```jsx
package com.wecp.simplified_event_management_jwt.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "events") // do not change this line (table name)
public class Event {

    // implement event entity here
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @ManyToMany(mappedBy = "rsvpedEvents")
    private Set<User> participants = new HashSet<>();

    public Event (){}

    public Event(Long id, String name, String description, Set<User> participants) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.participants = participants;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<User> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<User> participants) {
        this.participants = participants;
    }    

}
```