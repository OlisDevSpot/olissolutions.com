typescript
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import type { Context } from './context'; // Giả định kiểu Context của bạn được định nghĩa ở đây

/**
 * Khởi tạo backend tRPC
 * Chỉ nên thực hiện một lần duy nhất cho mỗi backend!
 */
export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

/**
 * Procedure có thể tái sử dụng không yêu cầu người dùng đăng nhập.
 */
export const publicProcedure = t.procedure;

/**
 * Middleware để thực thi quyền truy cập gói đăng ký cao cấp (premium).
 * Middleware này kiểm tra hai điều kiện:
 * 1. Người dùng phải được xác thực (tức là ctx.user tồn tại).
 * 2. Người dùng đã xác thực phải có gói đăng ký cao cấp (ctx.user.isPremium là true).
 * Nếu một trong hai điều kiện không được đáp ứng, nó sẽ ném ra một TRPCError với mã lỗi chuẩn hóa.
 *
 * Điều này trực tiếp triển khai yêu cầu "Add permission checks - TRPC premiumProcedure".
 */
const enforcePremiumAccess = t.middleware(({ ctx, next }) => {
  // Kiểm tra xác thực người dùng.
  if (!ctx.user) {
    // Chương VI: Quy chuẩn phản hồi lỗi API - Trả về lỗi JSON chuẩn hóa
    throw new TRPCError({
      code: 'UNAUTHORIZED', // Người dùng chưa xác thực
      message: 'Authentication required to access premium features.',
    });
  }

  // Kiểm tra quyền premium của người dùng đã xác thực.
  if (!ctx.user.isPremium) {
    // Chương VI: Quy chuẩn phản hồi lỗi API - Trả về lỗi JSON chuẩn hóa
    throw new TRPCError({
      code: 'FORBIDDEN', // Người dùng đã xác thực nhưng thiếu quyền cụ thể (premium)
      message: 'You must have an active premium subscription to access this resource.',
    });
  }

  // Nếu cả hai kiểm tra đều vượt qua, người dùng có quyền truy cập premium.
  // Context được truyền xuống sẽ đảm bảo ctx.user là non-null và có thuộc tính isPremium là true.
  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // Truyền rõ ràng người dùng, giờ đây đã biết là không null và có premium
    },
  });
});

/**
 * Procedure có thể tái sử dụng yêu cầu người dùng đã đăng nhập VÀ có gói đăng ký premium.
 * Bất kỳ endpoint TRPC nào được xây dựng bằng procedure này sẽ tự động thực thi quyền truy cập premium.
 */
export const premiumProcedure = publicProcedure.use(enforcePremiumAccess);

/**
 * Factory tạo router
 */
export const createTRPCRouter = t.router;

/**
 * Gộp các router lại với nhau (nếu áp dụng cho cấu trúc dự án của bạn)
 */
export const mergeRouters = t.mergeRouters;