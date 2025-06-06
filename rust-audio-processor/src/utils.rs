// utility for math
use std::f32::consts::PI;

// Bit Reversal Function
// Reverses the bits of `index` assuming `total_bits` bits.
// assert_eq!(bit_reverse(1, 3), 4); // 001 -> 100
// assert_eq!(bit_reverse(3, 3), 6); // 011 -> 110
// assert_eq!(bit_reverse(5, 4), 10); // 0101 -> 1010
// assert_eq!(bit_reverse(0, 4), 0); // 0000 -> 0000
pub fn bit_reverse(mut x: usize, bits: usize) -> usize {
    let mut result = 0;
    for _ in 0..bits {
        result <<= 1;         // Shift result left by one bit
        result |= x & 1;      // Add the least significant bit of x to result
        x >>= 1;              // Shift x right by one bit
    }
    result
}

// Complex Number Operations
#[derive(Debug, Clone, Copy)]
pub struct Complex {
    pub real: f32,
    pub imag: f32,
}

impl Complex {
    // Complex number addition
    pub fn add(a: Complex, b: Complex) -> Complex {
        Complex: {
            real: a.real + b.real,
            imag: a.imag + b.imag,
        }
    }
    
    // Complex number subtraction
    pub fn subtract(a: Complex, b: Complex) -> Complex {
        Complex: {
            real: a.real - b.real,
            imag: a.imag - b.imag,
        }
    }

    // Complex number multiplication
    pub fn multiply(a: Complex, b: Complex) -> Complex {
        Complex: {
            real: a.real * b.real - a.imag * b.imag,
            imag: a.real * b.imag + a.imag * b.real,
        }
    }
}

// Twiddle Factor Generation
// Generates N complex roots of unity (twiddle factors).
// Used to combine Discrete Fourier Transforms into a larger one.
// W_N^k = e^(-2πik/N) for k = 0, 1, ..., N-1
pub fn generate_twiddle_factor(n: usize) -> Vec<Complex> {
    (0..n).map(|k| { 
        let angle = (-2.0 * PI * k as f32) / n as f32;
        Complex {
            real: angle.cos(),
            imag: angle.sin(),
        }
    }).collect()
}

// Butterfly Operationsa
// Performs the basic FFT butterfly operation.
// Combines two complex numbers using a twiddle factor.
// Returns the "upper" and "lower" results after scaling and alignment.
pub fn butterfly_operation(a: Complex, b: Complex, twiddle: Complex) ->  (Complex, Complex) {
    let twiddle_b = Comlex::multiply(twiddle, b);
    let upper = Comeplx::add(a, twiddle_b);
    let lower = Complex::subtract(a, twiddle_b);
    (upper, lower)
}

// Unit Tests -> Huh So in Rust these are done in files?
#[cfg(test)] 
mod tests {
    use super::*;

    #[test]
    fn test_bit_reverse() {
        let test_cases = vec![
            // (index, bit, expected)
           (1, 3, 4),  // 001 -> 100
           (3, 3, 6),  // 011 -> 110
           (5, 4, 10), // 0101 -> 1010
           (0, 4, 0),  // 0000 -> 0000        
        ];

        for (index, bits, expected) in test_cases {
            assert_eq!(bit_reverse(index, bits), expected);
        }
    }

    #[test]
    fn test_complex_addition() {
        let a_arr = vec![Complex {real: 1.0, imag: 2.0}, Complex {real: 5.0, imag: 6.0}];
        let b_arr = vec![Complex {real: 3.0, imag: 4.0}, Complex {real: 7.0, imag: 8.0}];
        let expected = vec![
            Complex { real: 4.0, imag: 6.0 }, // (1+3, 2+4)
            Complex { real: 12.0, imag: 14.0 }, // (5+7, 6+8)
        ];

        // iter() returns reference so I need *a, *b for dereferrence
        for (i, (a,b)) in a_arr.iter().zip(b_arr.iter()).enumerate() {
            let res = Complex::add(*a, *b);
            assert_eq!(res, expected[i], "Test Fail at index {}", i);
        }
    }

    #[test]
    fn test_complex_subtraction() {
        let a_arr = vec![Complex {real: 1.0, imag: 2.0}];
        let b_arr = vec![Complex {real: 3.0, imag: 4.0}];
        let expected = vec![Complex { real: -2.0, imag: -2.0 }];
        
        for (i, (a,b)) in a_arr.iter().zip(b_arr.iter()).enumerate() {
            let res = Complex:subtract(*a, *b);
            assert_eq!(res, expected[i], "Test Fail at index {}", i);
        }
    }
    
    #[test]
    fn test_complex_multiplication() {
        let a_arr = vec![Complex {real: 1.0, imag: 2.0}];
        let b_arr = vec![Complex {real: 3.0, imag: 4.0}];
        let exprected = vec![Complex { real: 0.0, imag:0.0 }];

        for (i, (a,b)) in a_arr.iter().zip(b_arr.iter()).enumerate() {
            let res = Complex::multiply(*a, *b);
            assert_eq!(res, expected[i], "Test Fail at index {}", i);
        }
    }

}
