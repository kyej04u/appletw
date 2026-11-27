Object.extend(Effect.Transitions,(function(){function k(A,B){return 1-A(1-B)}function h(A,B){B=2*B;
return 0.5*(B<1?A(B):2-A(2-B))}function p(B,A){A=2*A;return 0.5*(A<1?1-B(1-A):1+B(A-1))
}function g(A,C,B){B=2*B;return 0.5*(B<1?A(B):1+C(B-1))}function j(A,B,C){return{easeIn:A,easeOut:B,easeInOut:C}
}function a(A){return{easeIn:A,easeOut:k.curry(A),easeInOut:h.curry(A)}}function f(A){return{easeIn:k.curry(A),easeOut:A,easeInOut:p.curry(A)}
}function d(A,B){return{easeIn:A,easeOut:B,easeInOut:g.curry(A,B)}}function e(){var E=$A(arguments);
var A=E.shift();function H(){var I=[0].concat($A(arguments));return function(J){I[0]=J;
return A.apply(this,I)}}function D(){return k.curry(H.apply(this,arguments))}function G(){return h.curry(H.apply(this,arguments))
}var B=H.apply(this,E);B.custom=H;var C=k.curry(B);C.custom=D;var F=h.curry(B);
F.custom=G;return{easeIn:B,easeOut:C,easeInOut:F}}var c=Math.PI/2;var u=2*Math.PI;
function t(A){return A*A}function r(A){return A*A*A}function x(A){return A*A*A*A
}function s(A){return A*A*A*A*A}function q(A,B){return Math.pow(A,B)}function v(A,B){return A*A*((B+1)*A-B)
}function w(A){if(A<(1/2.75)){return 7.5625*A*A}if(A<(2/2.75)){return 7.5625*(A-=(1.5/2.75))*A+0.75
}if(A<(2.5/2.75)){return 7.5625*(A-=(2.25/2.75))*A+0.9375}return 7.5625*(A-=(2.625/2.75))*A+0.984375
}function b(A){return -1*(Math.sqrt(1-A*A)-1)}function m(A){A-=1;return Math.sqrt(1-A*A)
}function z(B,A,D){if(B==0){return 0}if(B==1){return 1}if(A<1){A=1;var C=D/4}else{var C=D/u*Math.asin(1/A)
}return -(A*Math.pow(2,10*(B-=1))*Math.sin((B-C)*u/D))}function o(A){return(A==0)?0:Math.pow(2,10*(A-1))
}function y(A){return(A==1)?1:1-Math.pow(2,-10*A)}function n(A){return Math.cos(A*c)+1
}function l(A){return Math.sin(A*c)}function i(A){return -0.5*(Math.cos(Math.PI*A)-1)
}return{Quad:a(t),Cubic:a(r),Quart:a(x),Quint:a(s),Pow:e(q,2),Back:e(v,1.70158),Bounce:f(w),Circ:d(b,m),Elastic:e(z,1,0.3),Expo:d(o,y),Sine:j(n,l,i)}
})());