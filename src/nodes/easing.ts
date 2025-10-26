import { Fn, float } from 'three/tsl';
import type { ShaderNodeObject } from 'three/tsl';

/**
 * Collection of easing functions for smooth animations
 * All functions take a value t in [0, 1] and return an eased value
 */

// Quadratic easing
export const easeInQuad = Fn(([t]: [ShaderNodeObject<any>]) => {
  return t.mul(t);
});

export const easeOutQuad = Fn(([t]: [ShaderNodeObject<any>]) => {
  return t.mul(float(2).sub(t));
});

export const easeInOutQuad = Fn(([t]: [ShaderNodeObject<any>]) => {
  const doubled = t.mul(2);
  return doubled
    .lessThan(1)
    .select(doubled.mul(doubled).mul(0.5), float(1).sub(doubled.sub(1).mul(doubled.sub(3)).mul(0.5)));
});

// Cubic easing
export const easeInCubic = Fn(([t]: [ShaderNodeObject<any>]) => {
  return t.mul(t).mul(t);
});

export const easeOutCubic = Fn(([t]: [ShaderNodeObject<any>]) => {
  const t1 = t.sub(1);
  return t1.mul(t1).mul(t1).add(1);
});

export const easeInOutCubic = Fn(([t]: [ShaderNodeObject<any>]) => {
  const doubled = t.mul(2);
  const t1 = doubled.sub(2);
  return doubled
    .lessThan(1)
    .select(doubled.mul(doubled).mul(doubled).mul(0.5), t1.mul(t1).mul(t1).add(2).mul(0.5));
});

// Quartic easing
export const easeInQuart = Fn(([t]: [ShaderNodeObject<any>]) => {
  return t.mul(t).mul(t).mul(t);
});

export const easeOutQuart = Fn(([t]: [ShaderNodeObject<any>]) => {
  const t1 = t.sub(1);
  return float(1).sub(t1.mul(t1).mul(t1).mul(t1));
});

export const easeInOutQuart = Fn(([t]: [ShaderNodeObject<any>]) => {
  const doubled = t.mul(2);
  const t1 = doubled.sub(2);
  return doubled
    .lessThan(1)
    .select(doubled.mul(doubled).mul(doubled).mul(doubled).mul(0.5), float(1).sub(t1.mul(t1).mul(t1).mul(t1).mul(0.5)));
});

// Quintic easing
export const easeInQuint = Fn(([t]: [ShaderNodeObject<any>]) => {
  return t.mul(t).mul(t).mul(t).mul(t);
});

export const easeOutQuint = Fn(([t]: [ShaderNodeObject<any>]) => {
  const t1 = t.sub(1);
  return t1.mul(t1).mul(t1).mul(t1).mul(t1).add(1);
});

export const easeInOutQuint = Fn(([t]: [ShaderNodeObject<any>]) => {
  const doubled = t.mul(2);
  const t1 = doubled.sub(2);
  return doubled
    .lessThan(1)
    .select(doubled.mul(doubled).mul(doubled).mul(doubled).mul(doubled).mul(0.5), t1.mul(t1).mul(t1).mul(t1).mul(t1).add(2).mul(0.5));
});

// Sine easing
export const easeInSine = Fn(([t]: [ShaderNodeObject<any>]) => {
  return float(1).sub(t.mul(Math.PI / 2).cos());
});

export const easeOutSine = Fn(([t]: [ShaderNodeObject<any>]) => {
  return t.mul(Math.PI / 2).sin();
});

export const easeInOutSine = Fn(([t]: [ShaderNodeObject<any>]) => {
  return t.mul(Math.PI).cos().sub(1).mul(-0.5);
});

// Exponential easing
export const easeInExpo = Fn(([t]: [ShaderNodeObject<any>]) => {
  return t.equal(0).select(float(0), t.sub(1).mul(10).exp2());
});

export const easeOutExpo = Fn(([t]: [ShaderNodeObject<any>]) => {
  return t.equal(1).select(float(1), t.mul(-10).exp2().oneMinus());
});

export const easeInOutExpo = Fn(([t]: [ShaderNodeObject<any>]) => {
  const isZero = t.equal(0);
  const isOne = t.equal(1);
  const doubled = t.mul(2);
  const lessThanOne = doubled.lessThan(1);

  return isZero.select(
    float(0),
    isOne.select(
      float(1),
      lessThanOne.select(
        doubled.sub(1).mul(10).exp2().mul(0.5),
        doubled.sub(1).mul(-10).exp2().oneMinus().add(1).mul(0.5)
      )
    )
  );
});

// Circular easing
export const easeInCirc = Fn(([t]: [ShaderNodeObject<any>]) => {
  return float(1).sub(t.mul(t).oneMinus().sqrt());
});

export const easeOutCirc = Fn(([t]: [ShaderNodeObject<any>]) => {
  const t1 = t.sub(1);
  return t1.mul(t1).oneMinus().sqrt();
});

export const easeInOutCirc = Fn(([t]: [ShaderNodeObject<any>]) => {
  const doubled = t.mul(2);
  const t1 = doubled.sub(2);
  return doubled
    .lessThan(1)
    .select(
      doubled.mul(doubled).oneMinus().sqrt().oneMinus().mul(0.5),
      t1.mul(t1).oneMinus().sqrt().add(1).mul(0.5)
    );
});

// Back easing (overshoots)
export const easeInBack = Fn(([t]: [ShaderNodeObject<any>]) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return t.mul(t).mul(t.mul(c3).sub(c1));
});

export const easeOutBack = Fn(([t]: [ShaderNodeObject<any>]) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const t1 = t.sub(1);
  return t1.mul(t1).mul(t1.mul(c3).add(c1)).add(1);
});

export const easeInOutBack = Fn(([t]: [ShaderNodeObject<any>]) => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  const doubled = t.mul(2);
  const t1 = doubled.sub(2);

  return doubled
    .lessThan(1)
    .select(
      doubled.mul(doubled).mul(doubled.mul(c2 + 1).sub(c2)).mul(0.5),
      t1.mul(t1).mul(t1.mul(c2 + 1).add(c2)).add(2).mul(0.5)
    );
});

// Elastic easing (spring-like)
export const easeInElastic = Fn(([t]: [ShaderNodeObject<any>]) => {
  const c4 = (2 * Math.PI) / 3;

  return t.equal(0).select(
    float(0),
    t.equal(1).select(
      float(1),
      t.mul(10).sub(10.75).mul(c4).sin().mul(t.mul(10).sub(10).exp2()).negate()
    )
  );
});

export const easeOutElastic = Fn(([t]: [ShaderNodeObject<any>]) => {
  const c4 = (2 * Math.PI) / 3;

  return t.equal(0).select(
    float(0),
    t.equal(1).select(
      float(1),
      t.mul(-10).exp2().mul(t.mul(10).sub(0.75).mul(c4).sin()).add(1)
    )
  );
});

export const easeInOutElastic = Fn(([t]: [ShaderNodeObject<any>]) => {
  const c5 = (2 * Math.PI) / 4.5;
  const doubled = t.mul(2);

  return t.equal(0).select(
    float(0),
    t.equal(1).select(
      float(1),
      doubled.lessThan(1).select(
        doubled.mul(10).sub(10).exp2().mul(doubled.mul(10).sub(11.125).mul(c5).sin()).mul(-0.5),
        doubled.mul(-10).add(10).exp2().mul(doubled.mul(10).sub(11.125).mul(c5).sin()).mul(0.5).add(1)
      )
    )
  );
});

// Smooth step (classic smoothing function)
export const smoothStep = Fn(([t]: [ShaderNodeObject<any>]) => {
  const clamped = t.clamp(0, 1);
  return clamped.mul(clamped).mul(float(3).sub(clamped.mul(2)));
});

export const smootherStep = Fn(([t]: [ShaderNodeObject<any>]) => {
  const clamped = t.clamp(0, 1);
  return clamped.mul(clamped).mul(clamped).mul(clamped.mul(clamped.mul(6).sub(15)).add(10));
});
