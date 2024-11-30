# Code analysis
## frontend 
#### Version 0.0.1 

**By: default**

*Date: 2024-11-30*

## Introduction
This document contains results of the code analysis of frontend

Here I can add a description of my project

## Configuration

- Quality Profiles
    - Names: Sonar way [CSS]; Sonar way [JavaScript]; Sonar way [HTML]; 
    - Files: AZNrmB9KxUS2_b0QqMUt.json; AZNrmCCExUS2_b0QqMjl.json; AZNrmCOUxUS2_b0QqNWX.json; 


 - Quality Gate
    - Name: Sonar way
    - File: Sonar way.xml

## Synthesis

### Analysis Status

Reliability | Security | Security Review | Maintainability |
:---:|:---:|:---:|:---:
A | A | A | A |

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
0.0 % | 0.0 % | 3.9 % | 44.5 | 99.6 %

### Tests

Total | Success Rate | Skipped | Errors | Failures |
:---:|:---:|:---:|:---:|:---:
0 | 0 % | 0 | 0 | 0

### Detailed technical debt

Reliability|Security|Maintainability|Total
---|---|---|---
-|-|0d 1h 40min|0d 1h 40min


### Metrics Range

\ | Cyclomatic Complexity | Cognitive Complexity | Lines of code per file | Coverage | Comment density (%) | Duplication (%)
:---|:---:|:---:|:---:|:---:|:---:|:---:
Min | 0.0 | 0.0 | 1.0 | 0.0 | 0.0 | 0.0
Max | 243.0 | 192.0 | 2735.0 | 0.0 | 52.3 | 0.0

### Volume

Language|Number
---|---
CSS|477
JavaScript|2258
HTML|21
Total|2756


## Issues

### Issues count by severity and types

Type / Severity|INFO|MINOR|MAJOR|CRITICAL|BLOCKER
---|---|---|---|---|---
BUG|0|0|0|0|0
VULNERABILITY|0|0|0|0|0
CODE_SMELL|0|4|7|3|0


### Issues List

Name|Description|Type|Severity|Number
---|---|---|---|---
Cognitive Complexity of functions should not be too high|Cognitive Complexity is a measure of how hard the control flow of a function is to understand. Functions with high Cognitive Complexity will be <br /> difficult to maintain. <br /> See <br />  <br />    Cognitive Complexity  <br /> |CODE_SMELL|CRITICAL|3
Selectors should not be duplicated|Duplication of selectors might indicate a copy-paste mistake. The rule detects the following kinds of duplications: <br />  <br />    within a list of selectors in a single rule set  <br />    for duplicated selectors in different rule sets within a single stylesheet.  <br />  <br /> Noncompliant Code Example <br />  <br /> .foo, .bar, .foo { ... }  /* Noncompliant */ <br />  <br /> .class1 { ... } <br /> .class1 { ... }  /* Noncompliant */ <br />  <br /> Compliant Solution <br />  <br /> .foo, .bar { ... } <br />  <br /> .class1 { ... } <br /> .class2 { ... } <br /> |CODE_SMELL|MAJOR|1
Sections of code should not be commented out|Programmers should not comment out code as it bloats programs and reduces readability. <br /> Unused code should be deleted and can be retrieved from source control history if required.|CODE_SMELL|MAJOR|1
Unused assignments should be removed|A dead store happens when a local variable is assigned a value that is not read by any subsequent instruction. Calculating or retrieving a value <br /> only to then overwrite it or throw it away, could indicate a serious error in the code. Even if it’s not an error, it is at best a waste of resources. <br /> Therefore all calculated values should be used. <br /> Noncompliant Code Example <br />  <br /> i = a + b; // Noncompliant; calculation result not used before value is overwritten <br /> i = compute(); <br />  <br /> Compliant Solution <br />  <br /> i = a + b; <br /> i += compute(); <br />  <br /> Exceptions <br />  <br />    This rule ignores initializations to -1, 0, 1, undefined, [], {}, true, false and "".  <br />    Variables that start with an underscore (e.g. '_unused') are ignored.  <br />    Assignment of null is ignored because it is sometimes used to help garbage collection  <br />    Increment and decrement expressions are ignored because they are often used idiomatically instead of x+1  <br />    This rule also ignores variables declared with object destructuring using rest syntax (used to exclude some properties from object):  <br />  <br />  <br /> let {a, b, ...rest} = obj; // 'a' and 'b' are ok <br /> doSomething(rest); <br />  <br /> let [x1, x2, x3] = arr;    // but 'x1' is noncompliant, as omitting syntax can be used: "let [, x2, x3] = arr;" <br /> doSomething(x2, x3); <br />  <br /> See <br />  <br />    MITRE, CWE-563 - Assignment to Variable without Use ('Unused Variable')  <br /> |CODE_SMELL|MAJOR|1
Ternary operators should not be nested|Just because you can do something, doesn’t mean you should, and that’s the case with nested ternary operations. Nesting ternary operators <br /> results in the kind of code that may seem clear as day when you write it, but six months later will leave maintainers (or worse - future you) <br /> scratching their heads and cursing. <br /> Instead, err on the side of clarity, and use another line to express the nested operation as a separate statement. <br /> Noncompliant Code Example <br />  <br /> function getReadableStatus(job) { <br />   return job.isRunning() ? "Running" : job.hasErrors() ? "Failed" : "Succeeded ";  // Noncompliant <br /> } <br />  <br /> Compliant Solution <br />  <br /> function getReadableStatus(job) { <br />   if (job.isRunning()) { <br />     return "Running"; <br />   } <br />   return job.hasErrors() ? "Failed" : "Succeeded"; <br /> } <br />  <br /> Exceptions <br /> This rule does not apply in JSX expressions to support conditional rendering and conditional attributes. <br />  <br /> return ( <br /> &lt;&gt; <br />   {isLoading ? ( <br />     &lt;Loader active /&gt; <br />   ) : ( <br />     &lt;Panel label={isEditing ? 'Open' : 'Not open'}&gt; <br />       &lt;a&gt;{isEditing ? 'Close now' : 'Start now'}&lt;/a&gt; <br />       &lt;Checkbox onClick={!saving ? setSaving(saving =&gt; !saving) : null} /&gt; <br />     &lt;/Panel&gt; <br />   )} <br /> &lt;/&gt; <br /> ); <br /> |CODE_SMELL|MAJOR|1
No array index for keys in JSX list components|React expects a unique identifier for performance optimizations. An array index is not a stable identifier most of the time. This results in <br /> unnecessary renders when the array items change index following some mutation. When components have state, this might also provoke bugs that are hard <br /> to diagnose. <br /> We recommend using an explicit identifier to avoid misuse and accidental re-renders. If there is no unique attribute available, consider <br /> concatenating existing properties - hashing them if necessary - or creating a dedicated unique identifier. <br /> Noncompliant Code Example <br />  <br /> function generateButtons(props) { <br />   return props.buttons.map((button, index) =&gt; { <br />     &lt;Button key={index}&gt;{button.number}&lt;/Button&gt; <br />   }); <br /> } <br />  <br /> Compliant Solution <br />  <br /> function generateButtons(props) { <br />   return props.buttons.map((button, index) =&gt; { <br />     &lt;Button key={button.number}&gt;{button.number}&lt;/Button&gt; <br />   }); <br /> } <br />  <br /> See <br />  <br />    Recursing On Children - React API reference  <br />    S6477  <br />    S6486  <br /> |CODE_SMELL|MAJOR|3
Unnecessary imports should be removed|There’s no reason to import modules you don’t use; and every reason not to: doing so needlessly increases the load. <br /> Noncompliant Code Example <br />  <br /> import A from 'a';      // Noncompliant, A isn't used <br /> import { B1 } from 'b'; <br />  <br /> console.log(B1); <br />  <br /> Compliant Solution <br />  <br /> import { B1 } from 'b'; <br />  <br /> console.log(B1); <br /> |CODE_SMELL|MINOR|1
Unused local variables and functions should be removed|If a local variable or a local function is declared but not used, it is dead code and should be removed. Doing so will improve maintainability <br /> because developers will not wonder what the variable or function is used for. <br /> Noncompliant Code Example <br />  <br /> function numberOfMinutes(hours) { <br />   var seconds = 0;   // seconds is never used <br />   return hours * 60; <br /> } <br />  <br /> Compliant Solution <br />  <br /> function numberOfMinutes(hours) { <br />   return hours * 60; <br /> } <br /> |CODE_SMELL|MINOR|1
"for of" should be used with Iterables|If you have an iterable, such as an array, set, or list, your best option for looping through its values is the for of syntax. Use a <br /> counter, and …? well you’ll get the right behavior, but your code just isn’t as clean or clear. <br /> In a browser environment, NodeList and other array-like collections should work by default. If you are using TypeScript and seeing a <br /> type error, make sure your configuration is correct. <br /> Noncompliant Code Example <br />  <br /> const arr = [4, 3, 2, 1]; <br />  <br /> for (let i = 0; i &lt; arr.length; i++) {  // Noncompliant <br />   console.log(arr[i]); <br /> } <br />  <br /> Compliant Solution <br />  <br /> const arr = [4, 3, 2, 1]; <br />  <br /> for (let value of arr) { <br />   console.log(value); <br /> } <br /> |CODE_SMELL|MINOR|2


## Security Hotspots

### Security hotspots count by category and priority

Category / Priority|LOW|MEDIUM|HIGH
---|---|---|---
LDAP Injection|0|0|0
Object Injection|0|0|0
Server-Side Request Forgery (SSRF)|0|0|0
XML External Entity (XXE)|0|0|0
Insecure Configuration|0|0|0
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

