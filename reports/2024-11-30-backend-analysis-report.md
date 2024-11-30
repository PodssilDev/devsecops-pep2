# Code analysis
## backend 
#### Version 0.0.1-SNAPSHOT 

**By: default**

*Date: 2024-11-30*

## Introduction
This document contains results of the code analysis of backend

Pingeso

## Configuration

- Quality Profiles
    - Names: Sonar way [Java]; Sonar way [XML]; 
    - Files: AZNrmCLoxUS2_b0QqNN-.json; AZNrmCPSxUS2_b0QqNXm.json; 


 - Quality Gate
    - Name: Sonar way
    - File: Sonar way.xml

## Synthesis

### Analysis Status

Reliability | Security | Security Review | Maintainability |
:---:|:---:|:---:|:---:
A | A | E | A |

### Quality gate status

| Quality Gate Status | OK |
|-|-|

Metric|Value
---|---
Reliability Rating on New Code|OK
Security Rating on New Code|OK
Maintainability Rating on New Code|OK


### Metrics

Coverage | Duplications | Comment density | Median number of lines of code per file | Adherence to coding standard |
:---:|:---:|:---:|:---:|:---:
100.0 % | 0.0 % | 9.7 % | 193.0 | 99.8 %

### Tests

Total | Success Rate | Skipped | Errors | Failures |
:---:|:---:|:---:|:---:|:---:
18 | 100.0 % | 0 | 0 | 0

### Detailed technical debt

Reliability|Security|Maintainability|Total
---|---|---|---
-|-|0d 0h 36min|0d 0h 36min


### Metrics Range

\ | Cyclomatic Complexity | Cognitive Complexity | Lines of code per file | Coverage | Comment density (%) | Duplication (%)
:---|:---:|:---:|:---:|:---:|:---:|:---:
Min | 3.0 | 0.0 | 27.0 | 100.0 | 0.0 | 0.0
Max | 56.0 | 39.0 | 343.0 | 100.0 | 20.5 | 0.0

### Volume

Language|Number
---|---
Java|343
XML|178
Total|521


## Issues

### Issues count by severity and types

Type / Severity|INFO|MINOR|MAJOR|CRITICAL|BLOCKER
---|---|---|---|---|---
BUG|0|0|0|0|0
VULNERABILITY|0|0|0|0|0
CODE_SMELL|0|2|0|2|0


### Issues List

Name|Description|Type|Severity|Number
---|---|---|---|---
Try-with-resources should be used|Java 7 introduced the try-with-resources statement, which guarantees that the resource in question will be closed. Since the new syntax is closer <br /> to bullet-proof, it should be preferred over the older try/catch/finally version. <br /> This rule checks that close-able resources are opened in a try-with-resources statement. <br /> Note that this rule is automatically disabled when the project’s sonar.java.source is lower than 7. <br /> Noncompliant Code Example <br />  <br /> FileReader fr = null; <br /> BufferedReader br = null; <br /> try { <br />   fr = new FileReader(fileName); <br />   br = new BufferedReader(fr); <br />   return br.readLine(); <br /> } catch (...) { <br /> } finally { <br />   if (br != null) { <br />     try { <br />       br.close(); <br />     } catch(IOException e){...} <br />   } <br />   if (fr != null ) { <br />     try { <br />       br.close(); <br />     } catch(IOException e){...} <br />   } <br /> } <br />  <br /> Compliant Solution <br />  <br /> try ( <br />     FileReader fr = new FileReader(fileName); <br />     BufferedReader br = new BufferedReader(fr) <br />   ) { <br />   return br.readLine(); <br /> } <br /> catch (...) {} <br />  <br /> or <br />  <br /> try (BufferedReader br = <br />         new BufferedReader(new FileReader(fileName))) { // no need to name intermediate resources if you don't want to <br />   return br.readLine(); <br /> } <br /> catch (...) {} <br />  <br /> See <br />  <br />    CERT, ERR54-J. - Use a try-with-resources statement to safely handle closeable <br />   resources  <br /> |CODE_SMELL|CRITICAL|1
Cognitive Complexity of methods should not be too high|Cognitive Complexity is a measure of how hard the control flow of a method is to understand. Methods with high Cognitive Complexity will be <br /> difficult to maintain. <br /> Exceptions <br /> equals and hashCode methods are ignored because they might be automatically generated and might end up being difficult to <br /> understand, especially in presence of many fields. <br /> See <br />  <br />    Cognitive Complexity  <br /> |CODE_SMELL|CRITICAL|1
Strings should not be concatenated using '+' in a loop|Strings are immutable objects, so concatenation doesn’t simply add the new String to the end of the existing string. Instead, in each loop <br /> iteration, the first String is converted to an intermediate object type, the second string is appended, and then the intermediate object is converted <br /> back to a String. Further, performance of these intermediate operations degrades as the String gets longer. Therefore, the use of StringBuilder is <br /> preferred. <br /> Noncompliant Code Example <br />  <br /> String str = ""; <br /> for (int i = 0; i &lt; arrayOfStrings.length ; ++i) { <br />   str = str + arrayOfStrings[i]; <br /> } <br />  <br /> Compliant Solution <br />  <br /> StringBuilder bld = new StringBuilder(); <br />   for (int i = 0; i &lt; arrayOfStrings.length; ++i) { <br />     bld.append(arrayOfStrings[i]); <br />   } <br />   String str = bld.toString(); <br /> |CODE_SMELL|MINOR|1
"StandardCharsets" constants should be preferred|JDK7 introduced the class java.nio.charset.StandardCharsets. It provides constants for all charsets that are guaranteed to be <br /> available on every implementation of the Java platform. <br />  <br />    ISO_8859_1  <br />    US_ASCII  <br />    UTF_16  <br />    UTF_16BE  <br />    UTF_16LE  <br />    UTF_8  <br />  <br /> These constants should be preferred to: <br />  <br />    the use of a String such as "UTF-8" which has the drawback of requiring the catch/throw of an <br />   UnsupportedEncodingException that will never actually happen  <br />    the use of Guava’s Charsets class, which has been obsolete since JDK7  <br />  <br /> Noncompliant Code Example <br />  <br /> try { <br />   byte[] bytes = string.getBytes("UTF-8"); // Noncompliant; use a String instead of StandardCharsets.UTF_8 <br /> } catch (UnsupportedEncodingException e) { <br />   throw new AssertionError(e); <br /> } <br /> // ... <br /> byte[] bytes = string.getBytes(Charsets.UTF_8); // Noncompliant; Guava way obsolete since JDK7 <br />  <br /> Compliant Solution <br />  <br /> byte[] bytes = string.getBytes(StandardCharsets.UTF_8) <br /> |CODE_SMELL|MINOR|1


## Security Hotspots

### Security hotspots count by category and priority

Category / Priority|LOW|MEDIUM|HIGH
---|---|---|---
LDAP Injection|0|0|0
Object Injection|0|0|0
Server-Side Request Forgery (SSRF)|0|0|0
XML External Entity (XXE)|0|0|0
Insecure Configuration|1|0|0
XPath Injection|0|0|0
Authentication|0|0|0
Weak Cryptography|0|0|0
Denial of Service (DoS)|0|0|0
Log Injection|0|0|0
Cross-Site Request Forgery (CSRF)|0|0|0
Open Redirect|0|0|0
Permission|0|0|0
SQL Injection|0|0|0
Encryption of Sensitive Data|0|0|0
Traceability|0|0|0
Buffer Overflow|0|0|0
File Manipulation|0|0|0
Code Injection (RCE)|0|0|0
Cross-Site Scripting (XSS)|0|0|0
Command Injection|0|0|0
Path Traversal Injection|0|0|0
HTTP Response Splitting|0|0|0
Others|0|0|0


### Security hotspots

Category|Name|Priority|Severity|Count
---|---|---|---|---
Insecure Configuration|Having a permissive Cross-Origin Resource Sharing policy is security-sensitive|LOW|MINOR|1
